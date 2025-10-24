# Cafegardee Recipes ☕️

Welcome to Cafegardee, your personal guide to the world of flavors! This application is a beautifully designed, bilingual recipe browser that helps users discover and learn how to make a variety of coffees, teas, and herbal infusions.

## ✨ Features

- **📖 Interactive Recipe Browser:** Explore a curated collection of drink recipes through an elegant, card-based interface.
- **🌍 Bilingual Support:** The entire UI is available in both **English** and **Persian (Farsi)**, with an easy-to-use language switcher.
- ** modals:** Click on any recipe to view detailed ingredients and step-by-step instructions in a clean, focused modal view.
- **🎨 Responsive & Modern UI:** Built with Tailwind CSS, the interface is clean, responsive, and works beautifully on all devices, featuring a dark mode.
- **🔍 Category Filtering:** Quickly filter recipes by categories like "Coffee," "Tea," and "Herbal Infusions."

## 🛠 Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)

## 🏗️ Project Architecture

This is a **client-side application** built with React. All recipe data is stored locally within the application, creating a fast, reliable, and offline-first user experience.

-   **`src/`**: Contains all the client-side React application code.
-   **`src/components/RecipeBrowser.tsx`**: The main component that displays recipe cards and handles filtering logic.
-   **`src/data/recipes.ts`**: Contains the bilingual data for all the recipes.