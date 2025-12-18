import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // 1️⃣ Load OpenRouter API key from environment variables
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
        return NextResponse.json(
            { error: "OpenRouter API key not configured" },
            { status: 500 }
        );
    }

    // 2️⃣ Parse the JSON body from the frontend
    let body;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { code, language } = body;

    if (!code || !language) {
        return NextResponse.json(
            { error: "Code and language required" },
            { status: 400 }
        );
    }

    // 3️⃣ Build the prompt to send to the AI
    const prompt = `
You are a strict code reviewer.
Analyze the following Code:
${code}, infer its language and 
Return ONLY valid JSON:
{
  "errors": string[],
  "warnings": string[],
  "suggestions": string[],
  "fullcorrectedcode": string[]
}

`;

    try {
        // 4️⃣ Send request to OpenRouter API
        const aiResponse = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-chat", // free model
                    messages: [
                        {
                            role: "system",
                            content: "You are a strict code reviewer. Only respond with JSON."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.2,
                }),
            }
        );

        // 5️⃣ Handle API errors
        if (!aiResponse.ok) {
            const errorText = await aiResponse.text();
            return NextResponse.json(
                {
                    error: `OpenRouter returned status ${aiResponse.status}`,
                    details: errorText,
                },
                { status: 500 }
            );
        }

        // 6️⃣ Extract AI text safely
        const aiData = await aiResponse.json();
        const aiText = aiData?.choices?.[0]?.message?.content;

        if (!aiText) {
            return NextResponse.json(
                { error: "Empty AI response", raw: aiData },
                { status: 500 }
            );
        }

        console.log("AI RAW TEXT:", aiText); // helps debug AI output

        // 7️⃣ Safely parse JSON from AI text
        let parsedResult;
        try {
            // Use regex to extract the first JSON object in the text
            const jsonMatch = aiText.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {
                throw new Error("No JSON object found in AI response");
            }

            parsedResult = JSON.parse(jsonMatch[0]);
        } catch (err) {
            return NextResponse.json(
                {
                    error: "AI returned unparseable JSON" + err,
                    raw: aiText,
                },
                { status: 500 }
            );
        }

        // 8️⃣ Return structured results to the frontend
        return NextResponse.json({
            success: true,
            summary: "AI analysis completed",
            errors: Array.isArray(parsedResult.errors) ? parsedResult.errors : [],
            warnings: Array.isArray(parsedResult.warnings) ? parsedResult.warnings : [],
            suggestions: Array.isArray(parsedResult.suggestions) ? parsedResult.suggestions : [],
            fullcorrectedcode: Array.isArray(parsedResult.fullcorrectedcode) ? parsedResult.fullcorrectedcode : [],
        });
    } catch (err) {
        // 9️⃣ Catch any unexpected errors
        return NextResponse.json(
            { error: "Network or unexpected error", details: `${err}` },
            { status: 500 }
        );
    }
}
