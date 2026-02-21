import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.ambientBlobs} aria-hidden="true" />

      {/* ── Nav ── */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <div className={styles.navLogo}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <span className={styles.navName}>CodeReview<em>AI</em></span>
        </div>
        <div className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#how" className={styles.navLink}>How it works</a>
          <Link href="/review" className={styles.navCta}>Try it free</Link>
        </div>
      </nav>

      <main className={styles.main}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/>
            </svg>
            AI-Powered · Instant · Free
          </div>

          <h1 className={styles.heroTitle}>
            Better code,<br />
            <em>reviewed instantly</em>
          </h1>

          <p className={styles.heroSubtitle}>
            Paste your JavaScript, TypeScript, or Python and get a detailed breakdown
            of errors, warnings, and improvement suggestions — in seconds.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/components/main" className={styles.primaryBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Start reviewing code
            </Link>
            <a href="#how" className={styles.secondaryBtn}>
              See how it works
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <polyline points="19 12 12 19 5 12"/>
              </svg>
            </a>
          </div>

          {/* Decorative code window */}
          <div className={styles.heroWindow}>
            <div className={styles.windowBar}>
              <span className={styles.dot} style={{ background: "#FCA5A5" }} />
              <span className={styles.dot} style={{ background: "#FCD34D" }} />
              <span className={styles.dot} style={{ background: "#6EE7B7" }} />
              <span className={styles.windowTitle}>app.js</span>
            </div>
            <div className={styles.windowBody}>
              <pre className={styles.codePre}><code>
<span className={styles.cLine}><span className={styles.cKeyword}>function</span> <span className={styles.cFn}> fetchUser</span><span className={styles.cPunct}>(</span><span className={styles.cParam}>id</span><span className={styles.cPunct}>)</span> <span className={styles.cPunct}>{"{"}</span></span>
<span className={styles.cLine}>{"  "}<span className={styles.cKeyword}>const</span> res <span className={styles.cOp}>=</span> <span className={styles.cFn}>fetch</span><span className={styles.cPunct}>(</span><span className={styles.cStr}>{"`/api/users/${id}`"}</span><span className={styles.cPunct}>)</span></span>
<span className={styles.cLine}>{"  "}<span className={styles.cKeyword}>return</span> res<span className={styles.cPunct}>.</span><span className={styles.cFn}>json</span><span className={styles.cPunct}>()</span></span>
<span className={styles.cLine}><span className={styles.cPunct}>{"}"}</span></span>
              </code></pre>
              <div className={styles.windowResults}>
                <div className={`${styles.resultChip} ${styles.chipError}`}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Missing await on fetch()
                </div>
                <div className={`${styles.resultChip} ${styles.chipWarning}`}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  No error handling
                </div>
                <div className={`${styles.resultChip} ${styles.chipSuggestion}`}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
                  Add TypeScript types
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className={styles.features} id="features">
          <div className={styles.sectionEyebrow}>What you get</div>
          <h2 className={styles.sectionTitle}>Everything your code needs</h2>
          <div className={styles.featureGrid}>

            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.iconRed}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3>Error Detection</h3>
              <p>Catches bugs, syntax problems, and logic errors before they reach production.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.iconAmber}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h3>Smart Warnings</h3>
              <p>Surfaces potential issues, anti-patterns, and performance concerns with clear explanations.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.iconBlue}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
              </div>
              <h3>Improvement Tips</h3>
              <p>Actionable suggestions for readability, best practices, and modern patterns.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.iconGreen}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3>Corrected Code</h3>
              <p>Receive a fully fixed version of your code with all issues resolved and explained.</p>
            </div>

          </div>
        </section>

        {/* ── How it works ── */}
        <section className={styles.how} id="how">
          <div className={styles.sectionEyebrow}>Simple by design</div>
          <h2 className={styles.sectionTitle}>Three steps to cleaner code</h2>
          <div className={styles.steps}>

            <div className={styles.step}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepContent}>
                <h3>Choose your language</h3>
                <p>Select JavaScript, TypeScript, or Python from the language switcher.</p>
              </div>
            </div>

            <div className={styles.stepConnector} aria-hidden="true" />

            <div className={styles.step}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepContent}>
                <h3>Paste your code</h3>
                <p>Drop in any snippet — a function, a file, or a block that is giving you trouble.</p>
              </div>
            </div>

            <div className={styles.stepConnector} aria-hidden="true" />

            <div className={styles.step}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepContent}>
                <h3>Get instant feedback</h3>
                <p>Errors, warnings, suggestions, and a corrected version appear in seconds.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className={styles.ctaBanner}>
          <h2>Ready to write better code?</h2>
          <p>No sign-up needed. Just paste and go.</p>
          <Link href="/review" className={styles.primaryBtn}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Start reviewing code
          </Link>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <span>CodeReview<em>AI</em> — built with Next.js</span>
        <span className={styles.footerRight}>No data stored. Reviews are private.</span>
      </footer>
    </div>
  );
}