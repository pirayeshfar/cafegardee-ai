import type { Language } from '../types';

const translations = {
  en: {
    appTitle: 'Cafégardee',
    placeholder: 'Ask me anything about cafes, restaurants, or recipes...',
    welcomeTitle: 'Welcome to Cafégardee',
    welcomeSubtitle: 'Your AI guide to the world of flavors. Ask a question or try a suggestion below.',
    findNearMe: 'Find places near me',
    findingLocation: 'Finding your location...',
    locationError: 'Could not get your location. Please grant permission and try again.',
    errorMessage: 'Sorry, I had trouble connecting. Please try again.',
    timeoutError: 'The request timed out. Please check your connection and try again.',
    send: 'Send',
    newChat: 'New Chat',
    promptStarter1: 'Suggest a cozy cafe nearby',
    promptStarter2: 'How do I make a perfect iced latte?',
    promptStarter3: 'What\'s the difference between a flat white and a latte?',
    promptStarter4: 'Give me a recipe for a non-alcoholic mojito',
    disclaimer: 'Cafegardee is an AI-powered assistant. Responses may be inaccurate. Service may not be available in all regions.',
    locationPromptPart1: 'Find cafes and restaurants near me. My current location is',
    locationPromptLat: 'latitude',
    locationPromptLng: 'longitude',
  },
  fa: {
    appTitle: 'کافه گردی',
    placeholder: 'هر سوالی در مورد کافه، رستوران یا دستور پخت دارید بپرسید...',
    welcomeTitle: 'به کافه گردی خوش آمدید',
    welcomeSubtitle: 'راهنمای هوش مصنوعی شما در دنیای طعم‌ها. سوالی بپرسید یا یکی از پیشنهادها را امتحان کنید.',
    findNearMe: 'پیدا کردن مکان‌های نزدیک من',
    findingLocation: 'در حال یافتن موقعیت مکانی شما...',
    locationError: 'موقعیت مکانی شما دریافت نشد. لطفا دسترسی را تایید کرده و دوباره تلاش کنید.',
    errorMessage: 'متاسفانه در اتصال مشکلی پیش آمد. لطفا دوباره تلاش کنید.',
    timeoutError: 'درخواست بیش از حد طول کشید. لطفا اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.',
    send: 'ارسال',
    newChat: 'چت جدید',
    promptStarter1: 'یک کافه دنج در این نزدیکی پیشنهاد بده',
    promptStarter2: 'چطور یک آیس لاته عالی درست کنم؟',
    promptStarter3: 'تفاوت بین فلت وایت و لاته چیست؟',
    promptStarter4: 'دستور تهیه یک موهیتو بدون الکل به من بده',
    disclaimer: 'کافه گردی یک دستیار هوش مصنوعی است. پاسخ‌ها ممکن است دقیق نباشند. این سرویس ممکن است در همه مناطق در دسترس نباشد.',
    locationPromptPart1: 'کافه‌ها و رستوران‌های نزدیک من را پیدا کن. موقعیت فعلی من',
    locationPromptLat: 'عرض جغرافیایی',
    locationPromptLng: 'طول جغرافیایی',
  },
};

export const t = (key: keyof typeof translations.en, lang: Language): string => {
  return translations[lang][key] || translations.en[key];
};
