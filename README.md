# Cafegardee AI ☕️

Welcome to Cafegardee AI, your personal AI guide to the world of flavors! This application is designed to help users discover cafes and restaurants, find recipes for coffee, tea, and other beverages, and get location-based recommendations, all through a seamless, bilingual chat interface powered by Google's Gemini API.

## ✨ Features

- **🤖 AI-Powered Chatbot:** A central chatbot, using the `gemini-2.5-flash` model, provides knowledgeable and friendly responses to user queries.
- **🌍 Bilingual Support:** The entire UI and chatbot experience are available in both **English** and **Persian (Farsi)**, with easy language switching.
- **📍 Geolocation:** Users can request recommendations for cafes and restaurants nearby, utilizing their device's location.
- **🎨 Responsive & Modern UI:** Built with Tailwind CSS, the interface is clean, responsive, and works beautifully on all devices, featuring a dark mode.
- **🔒 Secure API Calls:** The Gemini API key is kept secure on the backend using a Vercel Serverless Function, preventing exposure on the client-side.
- **🚀 Zero-Config Deployment:** Deploys effortlessly on Vercel, leveraging serverless functions for the backend logic.

## 🛠 Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **AI Model:** [Google Gemini API](https://ai.google.dev/) (`@google/genai` SDK)
- **Deployment & Backend:** [Vercel](https://vercel.com/) (Serverless Functions)

## 🏗️ Project Architecture

This project is a modern single-page application (SPA) with a serverless backend component.

1.  **Frontend (`/src`):** A static React application that provides the user interface. All application source code resides in the `src` directory.
    -   `src/components/`: Reusable React components like the `Header`, `Chatbot`, and `LanguageSwitcher`.
    -   `src/hooks/useChat.ts`: A custom hook to manage the chat state, including messages, loading status, and communication with the backend.
    -   `src/services/geminiService.ts`: A service layer that abstracts the API call to our own backend endpoint.
    -   `src/lib/i18n.ts`: A simple internationalization utility for handling English and Persian translations.

2.  **Backend (`/api/generate.ts`):** A Vercel Serverless Function that acts as a secure proxy to the Google Gemini API.
    -   It receives the user's prompt and selected language from the frontend.
    -   It retrieves the `API_KEY` securely from environment variables.
    -   It constructs a request to the Gemini API, including a language-specific `systemInstruction` to tailor the AI's personality and language.
    -   It returns the AI's response to the frontend.

This architecture ensures that the `API_KEY` is never exposed to the user's browser, which is a critical security best practice.

## 🚀 Deployment

This application is configured for direct deployment to [Vercel](https://vercel.com/).

1.  Fork this repository.
2.  Create a new project on Vercel and import the forked repository.
3.  Add your Google Gemini API key as an environment variable named `API_KEY` in the Vercel project settings.
4.  Deploy! Vercel will automatically build the frontend and deploy the serverless function.