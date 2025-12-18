"use client"; // marks this as a Client Component

import Loader from "./loading"
import { useState } from "react";

export default function CodeEditor() {
    // State for the code input
    const [code, setCode] = useState("");

    // State for the selected language
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState("javascript");
    const [summary, setSummary] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [fullcorrectedcode, setFullCorrectedCode] = useState<string[]>([]);


    // State for the results (placeholder for now)

    // Handle form submission
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Send request to backend
            const response = await fetch("/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    language,
                }),
            });

            // 2. Parse JSON response INTO data
            const data = await response.json();

            // 3. Handle HTTP error response
            if (!response.ok) {
                setSummary("Request failed");
                setErrors([data.error || "Unknown error"]);
                setWarnings([]);
                setSuggestions([]);
                setFullCorrectedCode([]);
                return;
            }

            // 4. Success → update structured state
            setSummary(data.summary);
            setErrors(data.errors);
            setWarnings(data.warnings);
            setSuggestions(data.suggestions);
            setFullCorrectedCode(data.fullcorrectedcode);


        } catch (error) {
            // 5. Network / unexpected error
            setSummary("Unexpected error");
            setErrors([`Failed to connect to the server with error: ${error}`]);
            setWarnings([]);
            setFullCorrectedCode([]);
        }
        finally {
            setLoading(false); // stop loading
        }
    }





    return (
        <div className="code-editor-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Language:
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                    </select>
                </label>

                <label>
                    Paste your code here:
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        rows={10}
                        cols={50}
                        placeholder="Enter your code..."
                    />
                </label>

                <button type="submit">Review Code</button>
            </form>

            <div className="results">
                <h3>Code Review Summary</h3>

                {/* Loading indicator */}
                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <Loader />
                    </div>
                )}

                <p>{summary}</p>
                {errors.length > 0 && (
                    <>
                        <h2>Errors</h2>
                        <ul className="errorstyle">
                            {errors.map((err, index) => (
                                <li key={index}>{err}</li>
                            )
                            )}
                        </ul>
                    </>
                )}
                {warnings.length > 0 && (
                    <>
                        <h2>Warnings</h2>
                        <ul className="warningstyle">
                            {warnings.map((warn, index) => (
                                <li key={index}>{warn}</li>
                            ))}
                        </ul>
                    </>
                )}

                {suggestions.length > 0 && (
                    <>
                        <h2> Code Suggestions</h2>
                        <ul className="codesugg">
                            {suggestions.map((sugg, index) => (
                                <li key={index}>{sugg}</li>
                            ))}
                        </ul>
                    </>
                )}


                {fullcorrectedcode.length > 0 && (
                    <>
                        <h1>  Complete Code Fix</h1>
                        <ul className="fixes">
                            {fullcorrectedcode.map((fix, index) => (
                                <li key={index}>{fix}</li>
                            ))}

                        </ul>
                    </>
                )}
            </div>

        </div>
    )
};
