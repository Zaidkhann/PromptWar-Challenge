# Vanguard - AI-First Indian Election Guide

Vanguard is an intelligent, AI-powered platform designed to simplify and explain the Indian election process. Built for the Google Developer "Prompt War" challenge, it leverages the power of Gemini AI to provide real-time, factual, and concise information to voters.

## 🗳️ Chosen Vertical: Civic Education (Indian Elections)

We chose the **Civic Education** vertical, specifically focusing on the **Indian Election Process**. Elections in India are complex, involving multi-stage timelines, diverse registration procedures, and specific polling protocols. Vanguard aims to bridge the information gap by providing a modern, conversational interface for civic engagement.

---

## 🧠 Approach and Logic

### AI-First Interaction
Unlike traditional static guides, Vanguard puts the AI Assistant front and center. The interface is split into a **conversational pane** (left) and a **structured content pane** (right). This allows users to consume structured data while having a persistent AI companion to answer clarifying questions.

### Prompt Engineering Strategy
The core "intelligence" of Vanguard is driven by a carefully crafted **System Prompt**. Our strategy includes:
- **Persona Definition**: Establishing "Vanguard" as a friendly, factual, and concise civic guide.
- **Constraint-Based Responses**: Explicitly limiting responses to 2-4 sentences to ensure readability and prevent "hallucination loops" or information overload.
- **Scope Enforcement**: Instructions to politely redirect users if they ask questions outside the domain of Indian elections (e.g., politics, unrelated topics).
- **Formatting Directives**: Encouraging the use of bullet points and step-by-step formats for process-oriented queries.

### Tech Logic
- **Real-time Streaming**: Utilizes Gemini's streaming API (`sendMessageStream`) to provide an "alive" feel, reducing perceived latency.
- **Context Awareness**: Maintains a chat history within the session to allow for follow-up questions.
- **Responsive Design**: A glassmorphic, dark-themed UI that adapts from desktop side-by-side view to a mobile-optimized stacked view.

---

## ⚙️ How the Solution Works

1. **Authentication**: The app requires a Google Gemini API key (provided via `.env` or user input in the UI).
2. **AI Integration**: It uses the `@google/generative-ai` SDK to communicate with the `gemini-flash-latest` model.
3. **Structured Data**: 
   - **Timeline**: A visual step-by-step breakdown of the election lifecycle (Announcement -> Nomination -> Polling -> Counting).
   - **Checklist**: An interactive voter readiness tool to track ID requirements and registration status.
4. **Conversational Flow**: 
   - When a user sends a message, it is combined with a hidden `SYSTEM_PROMPT` and sent to Gemini.
   - The response is rendered using `react-markdown` with GFM support for clean, formatted output.

---

## 📝 Assumptions Made

- **General Applicability**: The guide assumes general rules applicable to Lok Sabha and State Assembly elections in India as governed by the Election Commission of India (ECI).
- **API Availability**: Assumes the user has access to a Gemini API key with sufficient quota.
- **Browser Security**: Assumes a modern browser environment for supporting ES Modules (Vite) and Framer Motion animations.
- **Information Recency**: The AI's knowledge is based on the underlying training data of Gemini, with the System Prompt acting as a guardrail for factual consistency regarding standard ECI procedures.

---

## 🚀 Tech Stack

- **Framework**: React 18 + Vite
- **AI**: Google Gemini AI (Gemini Flash)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Markdown**: React Markdown + Remark GFM

---

## 🛠️ Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
