
# Cafégardee AI Chat ☕️

Welcome to Cafégardee, your personal AI guide to the world of flavors! This application is a beautifully designed, bilingual chatbot that helps users discover cafes, restaurants, and recipes.

## ✨ Features

- **🤖 AI-Powered Chat:** Ask for cafe or restaurant recommendations, or even drink recipes.
- **🌍 Bilingual Support:** The entire UI is available in both **English** and **Persian (Farsi)**, with an easy-to-use language switcher.
- **📍 Location-Aware:** Can find places near you using your device's location.
- **🎨 Responsive & Modern UI:** Built with Tailwind CSS, the interface is clean, responsive, and works beautifully on all devices, featuring a dark mode.
- **🚀 Powered by Gemini:** Utilizes the Google Gemini API for intelligent and helpful responses, with Google Maps grounding for location-based queries.

## 🛠 Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **AI:** [@google/genai](https://www.npmjs.com/package/@google/genai) for the Gemini API

## 🏗️ Project Architecture

This is a **client-side application** built with React. It communicates directly with the Google Gemini API to provide chat functionality.

-   **`src/`**: Contains all the client-side React application code.
-   **`src/components/Chatbot.tsx`**: The main component that handles the chat interface.
-   **`src/services/geminiService.ts`**: Contains the logic for interacting with the Gemini API.
-   **`src/hooks/useChat.ts`**: A custom hook to manage the chat state and logic.
