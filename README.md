# CodeReviewAI 🛡️

**CodeReviewAI** is a premium, AI-powered code analysis tool that provides instant feedback on your scripts. Whether you're writing JavaScript, TypeScript, or Python, CodeReviewAI identifies bugs, suggests performance optimizations, and provides a fully corrected version of your code in seconds.

Built with **Next.js 15+**, **React 19**, and powered by the cutting-edge **Groq Cloud API** (Llama-3 models).

---

## ✨ Features

- 🔍 **Deep Error Detection**: Catches syntax errors, logical bugs, and potential runtime crashes.
- ⚠️ **Smart Warnings**: Identifies anti-patterns, security risks, and performance bottlenecks.
- 💡 **Actionable Suggestions**: Provides clear, senior-level advice on how to improve code readability and maintainability.
- 🛠️ **Full Code Correction**: Generates a refined, production-ready version of your code snippet.
- ⚡ **Lightning Fast**: Powered by Groq's high-speed inference engine for near-instant results.
- 🎨 **Modern Interface**: A sleek, dark-themed UI with glassmorphism and smooth animations.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Styled Components](https://styled-components.com/) & Vanilla CSS Modules
- **AI Engine**: [Groq Cloud API](https://groq.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm / yarn / pnpm
- A **Groq API Key** (Get one at [console.groq.com](https://console.groq.com/))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/code-review-ai.git
   cd code-review-ai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Groq API key:

   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

- `app/` - Next.js App Router directory.
  - `api/review/` - Backend endpoint for AI processing via Groq.
  - `components/` - Reusable UI components (CodeEditor, Loading states).
  - `page.tsx` - The stunning landing page.
- `public/` - Static assets and icons.
- `styles/` - Global styles and CSS utilities.

---

## 🧪 Usage

1. Select your programming language (JS, TS, or Python).
2. Paste your code snippet into the editor.
3. Click "Analyze Code".
4. View the structured breakdown of **Errors**, **Warnings**, and **Suggestions**.
5. Copy the **Corrected Code** with a single click.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the CodeReviewAI Team.
