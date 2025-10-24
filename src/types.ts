
export type Language = 'en' | 'fa';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  type?: 'text' | 'loading' | 'error';
}

// FIX: Added Recipe-related types that were missing.
export type Category = 'coffee' | 'tea' | 'herbal';

export interface RecipeContent {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

export interface Recipe {
  id: number;
  category: Category;
  image: string;
  en: RecipeContent;
  fa: RecipeContent;
}
