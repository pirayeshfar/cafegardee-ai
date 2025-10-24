import React, { useState, useMemo } from 'react';
import type { Language, Category, Recipe } from '../types';
import { recipes } from '../data/recipes';
import { t } from '../lib/i18n';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';

interface RecipeBrowserProps {
  language: Language;
}

const RecipeBrowser: React.FC<RecipeBrowserProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const categories: (Category | 'all')[] = ['all', 'coffee', 'tea', 'herbal'];

  const filteredRecipes = useMemo(() => {
    if (activeCategory === 'all') {
      return recipes;
    }
    return recipes.filter(recipe => recipe.category === activeCategory);
  }, [activeCategory]);

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };
  
  const commonButtonClasses = 'px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-800';
  const activeButtonClasses = 'bg-amber-500 text-white shadow';
  const inactiveButtonClasses = 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700';


  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500">
          {t('recipesTitle', language)}
        </h2>
      </div>

      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`${commonButtonClasses} ${activeCategory === category ? activeButtonClasses : inactiveButtonClasses}`}
          >
            {t(category, language)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredRecipes.map(recipe => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            language={language} 
            onClick={() => handleCardClick(recipe)} 
          />
        ))}
      </div>

      <RecipeModal 
        isOpen={selectedRecipe !== null}
        onClose={handleCloseModal}
        recipe={selectedRecipe}
        language={language}
      />
    </div>
  );
};

export default RecipeBrowser;
