export type Language = 'en' | 'fa';

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
