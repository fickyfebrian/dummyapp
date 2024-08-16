import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalRecipe from '../modal/Recipes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ recipe, onClick }) => (
  <div 
    className="bg-white p-6 rounded-lg shadow-lg cursor-pointer px-2 py-2"
    onClick={() => onClick(recipe)}
  >
    <img src={recipe.image} alt={recipe.name} className="w-full h-2/3 mb-4 object-cover" />
    <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
    <p className="text-gray-700 ml-2 mb-4">{recipe.cuisine} - {recipe.mealType} </p>
    <p className="text-gray-500 ml-2 mb-1 text-sm">Tags: {recipe.tags.join(', ')}</p>
    <p className="text-gray-500 ml-2 mb-1 text-sm">Cooking Time: {recipe.cookTimeMinutes} minutes</p>
    <p className="text-gray-500 ml-2 mb-1 text-sm">Difficulty: {recipe.difficulty}</p>
    <p className='text-gray-500 ml-2 mb-1 text-sm'><FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />{recipe.rating} From</p>
    <p className='text-gray-500 ml-2 mb-1 text-sm'><FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />{recipe.reviewCount} </p>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-t-4 border-blue-300 border-solid rounded-full animate-spin"></div>
  </div>
);

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const recipesResponse = await axios.get("https://dummyjson.com/recipes");
        setRecipes(recipesResponse.data.recipes);

        const allTags = recipesResponse.data.recipes.flatMap(recipe => recipe.tags);
        setTags([...new Set(allTags)]);
      } catch (error) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      setFilterLoading(true);
      let filtered = recipes;

      if (searchQuery) {
        filtered = recipes.filter(recipe => 
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (selectedTag) {
        filtered = recipes.filter(recipe => 
          recipe.tags.includes(selectedTag)
        );
      }

      setFilteredRecipes(filtered);
      setFilterLoading(false);
    };

    if (recipes.length > 0) {
      fetchFilteredRecipes();
    }
  }, [searchQuery, selectedTag, recipes]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleTagChange = (e) => setSelectedTag(e.target.value);

  const displayedRecipes = filteredRecipes.length > 0 ? filteredRecipes : recipes;

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Recipes Page</h1>

      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for recipes..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          value={selectedTag}
          onChange={handleTagChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {filterLoading ? (
        <LoadingSpinner />
      ) : displayedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={setSelectedRecipe}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No recipes available.</p>
      )}

      {selectedRecipe && (
        <ModalRecipe
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Recipes;
