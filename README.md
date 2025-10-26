# Cafégardee AI Chat ☕️

Welcome to **Cafégardee AI Chat**, an innovative and bilingual web application designed to guide users through the world of flavors! This AI-powered chatbot helps you discover cafes, restaurants, and beverage recipes with ease, offering a seamless and modern user experience. Whether you're a coffee enthusiast or a casual explorer, Cafégardee is your go-to platform for personalized recommendations.

**Ideated, designed, and developed by Amir Saman Pirayeshfar.**

🔗 **Live Demo**: [View the app in AI Studio](https://ai.studio/apps/drive/1xjXJblK8wGQKrohFyJ3VU7TRD0zEVhZY)

## Features
- **AI-Powered Chatbot**: Ask for cafe/restaurant recommendations or explore coffee, tea, and herbal infusion recipes with intelligent responses powered by the Google Gemini API.
- **Bilingual Interface**: Seamlessly switch between **English** and **Persian (Farsi)** for a fully localized experience.
- **Location-Aware Recommendations**: Find nearby cafes and restaurants using device location integration with Google Maps grounding.
- **Modern & Responsive Design**: Built with **Tailwind CSS**, featuring a clean UI, dark mode, and compatibility across desktop and mobile devices.
- **Fast & Lightweight**: Optimized for performance with a client-side React architecture.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini API (@google/genai)
- **Location Services**: Google Maps API for location-based queries
- **Build Tool**: Vite
- **Deployment**: AI Studio hosting

## Project Architecture
This is a client-side application built with **React** and **TypeScript**, designed for scalability and maintainability:
- **`src/`**: Contains the core React application code.
- **`src/components/Chatbot.tsx`**: The main component handling the chat interface.
- **`src/services/geminiService.ts`**: Logic for interacting with the Gemini API.
- **`src/hooks/useChat.ts`**: Custom hook for managing chat state and interactions.
- **`src/lib/`**: Utility functions and configurations.
- **Other Files**: Configuration files like `vite.config.ts`, `tsconfig.json`, and `vercel.json` ensure smooth development and deployment.

## Run Locally

### Prerequisites
- **Node.js** (v16 or higher)
- A valid **Gemini API key** (for AI functionality)
- A **Google Maps API key** (for location-based features)

### Installation Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/pirayeshfar/cafegardee-ai.git
2. **Install dependencies:**:
   ```bash
   npm install
3. **Set up environment variables:**:
  * Create a .env.local file in the root directory.
  * Add your API keys:
  ```bash
  VITE_GEMINI_API_KEY=your-gemini-api-key-here
  VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```
4. **Run the app:**:
  ```bash
  npm run dev
```
   * Open http://localhost:5173 in your browser to view the app.
## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request for new features, bug fixes, or recipe suggestions. Please follow the Contributing Guidelines for a smooth collaboration.

## License
This project is licensed under the MIT License.

## Contact
Ideated, designed, and developed by Amir Saman Pirayeshfar. Connect with me:

* [Telegram](https://t.me/pirayeshfar)
* [Instagram](https://www.instagram.com/pirayeshfar/)
