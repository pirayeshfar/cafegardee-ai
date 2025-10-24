import React from 'react';
import type { Recipe, Language } from '../types';
import { t } from '../lib/i18n';

interface RecipeCardProps {
  recipe: Recipe;
  language: Language;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, language, onClick }) => {
  const content = recipe[language];
  const categoryText = t(recipe.category, language);

  return (
    <div 
      className="bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200 dark:border-stone-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View recipe for ${content.name}`}
    >
      <div className="relative">
        <img src={recipe.image} alt={content.name} className="w-full h-48 object-cover" />
        <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">{categoryText}</span>
      </div>
      <div className="p-5">
        <h3 className={`font-bold text-lg mb-2 ${language === 'fa' ? 'font-vazir' : 'font-display'}`}>{content.name}</h3>
        <p className="text-stone-600 dark:text-stone-400 text-sm line-clamp-2">{content.description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
