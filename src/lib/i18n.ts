import type { Language } from '../types';

const translations = {
  en: {
    appTitle: 'Cafégardee',
    recipesTitle: 'Explore Our Recipes',
    all: 'All',
    coffee: 'Coffee',
    tea: 'Tea',
    herbal: 'Herbal Infusions',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    close: 'Close',
  },
  fa: {
    appTitle: 'کافه گردی',
    recipesTitle: 'دستور پخت‌ها را کشف کنید',
    all: 'همه',
    coffee: 'قهوه',
    tea: 'چای',
    herbal: 'دمنوش',
    ingredients: 'مواد لازم',
    instructions: 'دستور تهیه',
    close: 'بستن',
  },
};

export const t = (key: keyof typeof translations.en, lang: Language): string => {
  return translations[lang][key] || translations.en[key];
};
