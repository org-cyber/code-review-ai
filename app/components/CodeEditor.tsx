"use client";

import Loader from "./loading";
import { useState } from "react";

// SVG Icons — no emojis
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconAlertCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const IconAlertTriangle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconLightbulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18"/>
    <line x1="10" y1="22" x2="14" y2="22"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconFileCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="10" y1="13" x2="14" y2="13"/>
    <line x1="8" y1="17" x2="16" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconSparkle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/>
  </svg>
);

const IconEmpty = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
  </svg>
);

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", icon: "JS" },
  { value: "Java", label: "Java", icon: "JAVA" },
  { value: "React", label: "React", icon: "RCT" },
  { value: "NextJs", label: "NextJs", icon: "NEXT" },
   { value: "Go", label: "Go", icon: "GO" },
  { value: "typescript", label: "TypeScript", icon: "TS" },
  { value: "python", label: "Python", icon: "Py" },
];

export default function CodeEditor() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [fullcorrectedcode, setFullCorrectedCode] = useState<string[]>([]);

  const hasResults = summary || errors.length > 0 || warnings.length > 0 || suggestions.length > 0 || fullcorrectedcode.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSummary("Request failed");
        setErrors([data.error || "Unknown error"]);
        setWarnings([]);
        setSuggestions([]);
        setFullCorrectedCode([]);
        return;
      }

      // Normalize: API may return a string, array, or undefined for any field
      const toArray = (val: unknown): string[] => {
        if (Array.isArray(val)) return val;
        if (typeof val === "string" && val.trim()) return [val];
        return [];
      };

      setSummary(typeof data.summary === "string" ? data.summary : "");
      setErrors(toArray(data.errors));
      setWarnings(toArray(data.warnings));
      setSuggestions(toArray(data.suggestions));
      setFullCorrectedCode(toArray(data.fullcorrectedcode));
    } catch (error) {
      setSummary("Unexpected error");
      setErrors([`Failed to connect to the server with error: ${error}`]);
      setWarnings([]);
      setSuggestions([]);
      setFullCorrectedCode([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Page Header */}
      <header className="page-header">
        <div className="page-header-eyebrow">
          <IconSparkle />
          AI-Powered Analysis
        </div>
        <h1 className="page-title">
          Code <em>Review</em>
        </h1>
        <p className="page-subtitle">
          Paste your code and get instant feedback on errors, warnings, and improvements.
        </p>
      </header>

      {/* Main Editor */}
      <main className="code-editor-container">
        {/* Input Panel */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-header-icon">
              <IconFileCode />
            </div>
            <span className="panel-header-title">Your Code</span>
            <span className="panel-header-subtitle">Supports JS · TS · Python</span>
          </div>

          <div className="panel-body">
            <form onSubmit={handleSubmit}>
              {/* Language selector */}
              <div className="field-group">
                <label className="field-label">
                  <IconCode />
                  Language
                </label>
                <div className="language-row">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.value}
                      type="button"
                      className={`lang-btn ${language === lang.value ? "active" : ""}`}
                      onClick={() => setLanguage(lang.value)}
                    >
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem" }}>
                        {lang.icon}
                      </span>
                      {lang.label}
                    </button>
                  ))}
                </div>
                {/* Hidden select for any server-side form needs */}
                <select
                  className="hidden-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>

              {/* Code textarea */}
              <div className="field-group">
                <label className="field-label" htmlFor="code-input">
                  <IconCode />
                  Paste your code
                </label>
                <textarea
                  id="code-input"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={12}
                  placeholder={`// Paste your ${language} code here…`}
                />
              </div>

              {/* Submit row */}
              <div className="submit-row">
                <span className="submit-hint">
                  {code.length > 0 ? `${code.split('\n').length} lines · ${code.length} chars` : "No code yet"}
                </span>
                <button type="submit" disabled={loading || !code.trim()}>
                  <IconSend />
                  {loading ? "Analysing…" : "Review Code"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Panel */}
        <div className="results">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-header-icon">
                <IconCheck />
              </div>
              <span className="panel-header-title">Review Results</span>
              {hasResults && !loading && (
                <span className="panel-header-subtitle">
                  {errors.length} errors · {warnings.length} warnings · {suggestions.length} suggestions
                </span>
              )}
            </div>

            <div className="panel-body">
              {/* Loading state */}
              {loading && (
                <div className="loading-overlay">
                  <Loader />
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" />
                  </div>
                  <span className="loading-label">Analysing your code…</span>
                </div>
              )}

              {/* Empty state */}
              {!loading && !hasResults && (
                <div className="results-empty">
                  <div className="results-empty-icon">
                    <IconEmpty />
                  </div>
                  <p>Submit your code above to see the review results here.</p>
                </div>
              )}

              {/* Results content */}
              {!loading && hasResults && (
                <>
                  {/* Summary */}
                  {summary && (
                    <p className="summary-text">{summary}</p>
                  )}

                  {/* Errors */}
                  {errors.length > 0 && (
                    <div className="result-section errors">
                      <div className="result-section-header">
                        <IconAlertCircle />
                        Errors
                        <span className="count-badge">{errors.length}</span>
                      </div>
                      <div className="result-section-body">
                        <ul className="result-list">
                          {errors.map((err, i) => (
                            <li key={i}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Warnings */}
                  {warnings.length > 0 && (
                    <div className="result-section warnings">
                      <div className="result-section-header">
                        <IconAlertTriangle />
                        Warnings
                        <span className="count-badge">{warnings.length}</span>
                      </div>
                      <div className="result-section-body">
                        <ul className="result-list">
                          {warnings.map((warn, i) => (
                            <li key={i}>{warn}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="result-section suggestions">
                      <div className="result-section-header">
                        <IconLightbulb />
                        Suggestions
                        <span className="count-badge">{suggestions.length}</span>
                      </div>
                      <div className="result-section-body">
                        <ul className="result-list">
                          {suggestions.map((sugg, i) => (
                            <li key={i}>{sugg}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Full corrected code */}
                  {fullcorrectedcode.length > 0 && (
                    <div className="result-section fixes">
                      <div className="result-section-header">
                        <IconCheck />
                        Complete Code Fix
                        <span className="count-badge">{fullcorrectedcode.length} changes</span>
                      </div>
                      <div className="result-section-body">
                        <ul className="result-list">
                          {fullcorrectedcode.map((fix, i) => (
                            <li key={i}>{fix}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}