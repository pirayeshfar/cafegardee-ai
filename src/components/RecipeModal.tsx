import React, { useEffect } from 'react';
import type { Recipe, Language } from '../types';
import { t } from '../lib/i18n';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  language: Language;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, recipe, language }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen || !recipe) {
    return null;
  }

  const content = recipe[language];

  return (
    <div
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-title"
    >
      <div
        className="relative bg-stone-100 dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 w-8 h-8 flex items-center justify-center bg-stone-800/50 text-white rounded-full hover:bg-stone-800/80 transition-colors"
          aria-label={t('close', language)}
        >
          <i className="fa-solid fa-times"></i>
        </button>

        <img src={recipe.image} alt={content.name} className="w-full h-64 object-cover rounded-t-2xl" />

        <div className="p-6 sm:p-8">
          <h2 id="recipe-title" className={`text-3xl font-bold mb-4 ${language === 'fa' ? 'font-vazir' : 'font-display'}`}>{content.name}</h2>
          <p className="text-stone-600 dark:text-stone-400 mb-6">{content.description}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 border-b-2 border-amber-500 pb-1">{t('ingredients', language)}</h3>
            <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-300">
              {content.ingredients.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 border-b-2 border-amber-500 pb-1">{t('instructions', language)}</h3>
            <ol className="list-decimal list-inside space-y-2 text-stone-700 dark:text-stone-300">
              {content.instructions.map((step, index) => <li key={index} className="pl-2">{step}</li>)}
            </ol>
          </div>
        </div>
      </div>
       <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.3s forwards ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default RecipeModal;
