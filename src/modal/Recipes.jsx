import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalRecipe = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
        <p className="text-gray-700 mb-4">{recipe.cuisine}</p>
        <p className="text-gray-500 text-sm mb-2">Tags: {recipe.tags.join(', ')}</p>
        <p className="text-gray-500 text-sm">{recipe.description}</p>
        <p className="text-gray-500 text-sm mb-2">Ingredients :{recipe.ingredients}</p>
        <p className="text-gray-500 text-sm">Instructions : {recipe.instructions}</p>
        <p className="text-gray-500 text-sm mb-2">Cooking Time: {recipe.cookTimeMinutes} minutes</p>

        
      </div>
    </div>,
    document.body
  );
};

export default ModalRecipe;
