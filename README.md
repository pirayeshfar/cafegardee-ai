# Cafegardee AI ☕️

Welcome to Cafegardee AI, your personal AI guide to the world of flavors! This application is designed to help users discover cafes and restaurants, find recipes for coffee, tea, and other beverages, and get location-based recommendations, all through a seamless, bilingual chat interface powered by Google's Gemini API.

## ✨ Features

- **🤖 AI-Powered Chatbot:** A central chatbot, using the `gemini-2.5-flash` model, provides knowledgeable and friendly responses to user queries.
- **🌍 Bilingual Support:** The entire UI and chatbot experience are available in both **English** and **Persian (Farsi)**, with easy language switching.
- **📍 Geolocation:** Users can request recommendations for cafes and restaurants nearby, utilizing their device's location.
- **🎨 Responsive & Modern UI:** Built with Tailwind CSS, the interface is clean, responsive, and works beautifully on all devices, featuring a dark mode.
- **⚡️ Vite-Powered:** Fast development and optimized builds thanks to Vite.
- ** streamed responses:** The chatbot's responses are streamed in real-time for a more dynamic user experience.

## 🛠 Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Vercel Serverless Function](https://vercel.com/docs/functions)
- **AI Model:** [Google Gemini API](https://ai.google.dev/) (`@google/genai` SDK)
- **Build Tool:** [Vite](https://vitejs.dev/)

## 🏗️ Project Architecture

This project uses a **Backend-for-Frontend (BFF)** architecture. The frontend is a modern single-page application (SPA) built with React, located in the `/src` directory. It does **not** communicate directly with the Google Gemini API.

Instead, the frontend sends requests to a backend serverless function located at `/api/generate.ts`. This backend function is responsible for securely calling the Google Gemini API with the necessary API key and then streaming the response back to the client. This is a secure and robust pattern that protects your API key from being exposed in the browser.

-   **`src/`**: Contains all the client-side React application code.
-   **`api/`**: Contains the Vercel serverless function that acts as a secure proxy to the Gemini API.
-   **`src/hooks/useChat.ts`**: A custom hook that manages the chat state and communicates with our `/api/generate` endpoint.
-   **`api/generate.ts`**: The server-side logic that constructs requests to the Google Gemini API, includes language-specific system instructions, and handles streaming responses.

---

## 🚀 Deployment & Setup

This application is designed for deployment on [Vercel](https://vercel.com).

### ‼️ IMPORTANT: API Key Configuration

For the chatbot to work, you **MUST** set your Google Gemini API key as an environment variable in your Vercel project settings.

1.  Go to your project's dashboard on Vercel.
2.  Navigate to the **Settings** tab.
3.  Click on **Environment Variables**.
4.  Create a new variable with the name `API_KEY` and paste your Google Gemini API key as the value.
5.  **Save** the variable. You may need to redeploy your project for the changes to take effect.

**The application will not function without this step.**

### Build Configuration

-   **Build Command:** `vite build`
-   **Output Directory:** `dist`
-   **Install Command:** `npm install`

Vercel should detect the framework and configure this automatically, but you can verify it in your project's general settings.
