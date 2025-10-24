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
    locationPromptPart1: 'Find cafes and restaurants near me. My current location is',
    locationPromptLat: 'latitude',
    locationPromptLng: 'longitude',
  },
  fa: {
    appTitle: 'کافه گردی',
    placeholder: 'کافه، رستوران یا دستور پخت پیدا کنید...',
    welcomeTitle: 'به کافه گردی خوش آمدید',
    welcomeSubtitle: 'راهنمای هوش مصنوعی شما در دنیای طعم‌ها. هر سوالی در مورد کافه‌ها، رستوران‌ها یا دستور نوشیدنی‌ها دارید بپرسید!',
    findNearMe: 'پیدا کردن مکان‌های نزدیک من',
    findingLocation: 'در حال یافتن موقعیت مکانی شما...',
    locationError: 'موقعیت مکانی شما دریافت نشد. لطفا دسترسی را تایید کرده و دوباره تلاش کنید.',
    errorMessage: 'متاسفانه در اتصال مشکلی پیش آمد. لطفا دوباره تلاش کنید.',
    send: 'ارسال',
    locationPromptPart1: 'کافه‌ها و رستوران‌های نزدیک من را پیدا کن. موقعیت فعلی من',
    locationPromptLat: 'عرض جغرافیایی',
    locationPromptLng: 'طول جغرافیایی',
  },
};

export const t = (key: keyof typeof translations.en, lang: Language): string => {
  return translations[lang][key] || translations.en[key];
};