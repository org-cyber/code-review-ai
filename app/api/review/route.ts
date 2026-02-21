import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // 1️⃣ Load Groq API key from environment variables
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        return NextResponse.json(
            { error: "Groq API key not configured" },
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
Analyze the following Code (${language}):
${code}

Return ONLY a valid JSON object with the following structure:
{
  "errors": string[],
  "warnings": string[],
  "suggestions": string[],
  "fullcorrectedcode": string
}
`;

    try {
        // 4️⃣ Send request to Groq Cloud API
        const aiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        { 
            role: "system", 
            content: "You are a senior software engineer and strict code reviewer. You analyze code for potential bugs, security issues, and style violations. You provide corrections and suggestions. Your output must be strictly valid JSON." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      temperature: 0.1,
      max_tokens: 4096,
      response_format: { type: "json_object" },
    }),
  });

        // 5️⃣ Handle API errors
        if (!aiResponse.ok) {
            const errorText = await aiResponse.text();
            return NextResponse.json(
                {
                    error: `Groq Cloud returned status ${aiResponse.status}`,
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
            parsedResult = JSON.parse(aiText);
        } catch (err) {
            // Fallback: try to extract JSON with regex if parsing fails directly
            const jsonMatch = aiText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    parsedResult = JSON.parse(jsonMatch[0]);
                } catch (innerErr) {
                    throw new Error("AI returned unparseable JSON");
                }
            } else {
                throw new Error("No JSON object found in AI response");
            }
        }

        // 8️⃣ Return structured results to the frontend
        return NextResponse.json({
            success: true,
            summary: "AI analysis completed",
            errors: Array.isArray(parsedResult.errors) ? parsedResult.errors : [],
            warnings: Array.isArray(parsedResult.warnings) ? parsedResult.warnings : [],
            suggestions: Array.isArray(parsedResult.suggestions) ? parsedResult.suggestions : [],
            fullcorrectedcode: typeof parsedResult.fullcorrectedcode === 'string' 
                ? parsedResult.fullcorrectedcode 
                : (Array.isArray(parsedResult.fullcorrectedcode) ? parsedResult.fullcorrectedcode.join('\n') : ""),
        });
    } catch (err) {
        // 9️⃣ Catch any unexpected errors
        return NextResponse.json(
            { error: "Network or unexpected error", details: `${err}` },
            { status: 500 }
        );
    }
}
