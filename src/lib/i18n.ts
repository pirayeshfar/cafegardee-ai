
import type { Language } from '../types';

const translations = {
  en: {
    appTitle: 'Cafégardee',
    placeholder: 'Find cafes, restaurants, or recipes...',
    welcomeTitle: 'Welcome to Cafégardee',
    welcomeSubtitle: 'Your AI guide to the world of flavors. Ask me anything about cafes, restaurants, or drink recipes!',
    findNearMe: 'Find places near me',
    findingLocation: 'Finding your location...',
    locationError: 'Could not get your location. Please grant permission and try again.',
    errorMessage: 'Sorry, I had trouble connecting. Please try again.',
    send: 'Send',
    recipesTitle: 'Browse Recipes',
    close: 'Close',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    all: 'All',
    coffee: 'Coffee',
    tea: 'Tea',
    herbal: 'Herbal',
    chat: 'Chat',
    recipes: 'Recipes',
  },
  fa: {
    appTitle: 'کافه گردی',
    placeholder: 'کافه، رستوران یا دستور پخت پیدا کنید...',
    welcomeTitle: 'به کافه گردی خوش آمدید',
    welcomeSubtitle: 'سلام! من Cafégardee هستم، راهنمای شما در دنیای طعم ها! چطور میتونم امروز بهتون کمک کنم؟ دنبال کافه خاصی هستید؟ رستوران؟ یا شاید هم یک دستور نوشیدنی خوشمزه؟ 😋',
    findNearMe: 'پیدا کردن مکان‌های نزدیک من',
    findingLocation: 'در حال یافتن موقعیت مکانی شما...',
    locationError: 'موقعیت مکانی شما دریافت نشد. لطفا دسترسی را تایید کرده و دوباره تلاش کنید.',
    errorMessage: 'متاسفانه در اتصال مشکلی پیش آمد. لطفا دوباره تلاش کنید.',
    send: 'ارسال',
    recipesTitle: 'مرور دستور پخت‌ها',
    close: 'بستن',
    ingredients: 'مواد لازم',
    instructions: 'دستورالعمل',
    all: 'همه',
    coffee: 'قهوه',
    tea: 'چای',
    herbal: 'دمنوش',
    chat: 'چت',
    recipes: 'دستور پخت‌ها',
  },
};

export const t = (key: keyof typeof translations.en, lang: Language): string => {
  return translations[lang][key] || translations.en[key];
};
