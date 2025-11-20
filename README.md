# Bug Bounty Dojo

Bug Bounty Dojo is an interactive, gamified educational platform designed to teach aspiring security researchers and developers the principles of web security. It combines hands-on vulnerability simulations with an AI-powered mentor to explain complex concepts simply.

## 🚀 Features

### 🛡️ Interactive Vulnerability Modules
Master the OWASP Top 10 and other critical vulnerabilities through safe, live simulations:

1.  **SQL Injection (SQLi)**
    *   **Concept**: Input validation failure allowing database query manipulation.
    *   **Simulation**: Bypass a login screen using tautologies (e.g., `' OR '1'='1`).
2.  **Cross-Site Scripting (XSS)**
    *   **Concept**: Injecting malicious scripts into trusted websites.
    *   **Simulation**: A social feed that renders unsanitized user input, triggering simulated alerts.
3.  **Broken Access Control (IDOR)**
    *   **Concept**: Insecure Direct Object References allowing unauthorized data access.
    *   **Simulation**: Manipulate API parameters to view other users' private profiles.
4.  **OS Command Injection**
    *   **Concept**: Executing arbitrary system commands on the server.
    *   **Simulation**: A network diagnostic tool vulnerable to command chaining (e.g., `8.8.8.8; cat /etc/passwd`).
5.  **Cross-Site Request Forgery (CSRF)**
    *   **Concept**: Tricking users into performing unwanted actions.
    *   **Simulation**: A mock "malicious site" that forces a browser to send state-changing requests to a "banking site".

### 🧠 AI Sensei (Gemini 2.5)
A built-in cybersecurity mentor powered by **Google Gemini 2.5 Flash**.
*   **Persona**: "Sensei" - wise, encouraging, and knowledgeable.
*   **Capabilities**: Explains technical concepts using analogies, provides hints, and answers free-form questions.
*   **Context Aware**: Remembers the chat history for a conversational experience.

### 🌍 Multi-Language Support
*   Full support for **English** and **Simplified Chinese (简体中文)**.
*   Switch languages instantly via the navbar.
*   Localized UI, educational content, quizzes, and AI system instructions.

### 📝 Quizzes & Progression
*   Interactive multiple-choice questions for every module.
*   Instant feedback with detailed explanations.
*   XP tracking (visual) to gamify the learning process.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript, Tailwind CSS
*   **AI**: Google GenAI SDK (`@google/genai`)
*   **Icons**: Lucide React
*   **Build**: Vite (implied)

## 📦 Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set your Google Gemini API Key in your environment variables.
4.  Run the development server:
    ```bash
    npm run dev
    ```
