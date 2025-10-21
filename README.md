# Cafegardee AI ☕️

Welcome to Cafegardee AI, your personal AI guide to the world of flavors! This application is designed to help users discover cafes and restaurants, find recipes for coffee, tea, and other beverages, and get location-based recommendations, all through a seamless, bilingual chat interface powered by Google's Gemini API.

## ✨ Features

- **🤖 AI-Powered Chatbot:** A central chatbot, using the `gemini-2.5-flash` model, provides knowledgeable and friendly responses to user queries.
- **🌍 Bilingual Support:** The entire UI and chatbot experience are available in both **English** and **Persian (Farsi)**, with easy language switching.
- **📍 Geolocation:** Users can request recommendations for cafes and restaurants nearby, utilizing their device's location.
- **🎨 Responsive & Modern UI:** Built with Tailwind CSS, the interface is clean, responsive, and works beautifully on all devices, featuring a dark mode.
- **🚀 Direct AI Integration:** The application communicates directly with the Google Gemini API from the client-side. The API key is securely managed by the execution environment.
- **⚡️ Vite-Powered:** Fast development and optimized builds thanks to Vite.

## 🛠 Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **AI Model:** [Google Gemini API](https://ai.google.dev/) (`@google/genai` SDK)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Deployment:** Any static hosting provider (e.g., Vercel, Netlify, GitHub Pages).

## 🏗️ Project Architecture

This project is a modern single-page application (SPA).

-   **Frontend (`/src`):** A static React application that provides the user interface. All application source code resides in the `src` directory.
    -   `src/components/`: Reusable React components like the `Header`, `Chatbot`, and `LanguageSwitcher`.
    -   `src/hooks/useChat.ts`: A custom hook to manage the chat state, including messages, loading status, and communication with the Gemini API.
    -   `src/services/geminiService.ts`: A service layer that encapsulates the logic for calling the Google Gemini API. It includes language-specific system instructions to tailor the AI's personality.
    -   `src/lib/i18n.ts`: A simple internationalization utility for handling English and Persian translations.

The Google Gemini API is called directly from the frontend. The `API_KEY` is expected to be provided as an environment variable in the execution environment, ensuring it's not hardcoded in the source code.

## 🚀 Deployment

This application can be deployed to any static site hosting service.

1.  Fork this repository.
2.  Connect your repository to a hosting provider like Vercel or Netlify.
3.  Add your Google Gemini API key as an environment variable named `API_KEY`.
4.  Configure the build command (`npm run build` or `vite build`) and the output directory (`dist`).
5.  Deploy!
