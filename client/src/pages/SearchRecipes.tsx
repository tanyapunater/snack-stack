import * as React from 'react';
import { useState } from 'react';
import { Recipe } from '../interfaces/getRecipes';

const getRecipes = (): Recipe[] => [
  {
    id: 1,
    title: 'Spaghetti Bolognese',
    description: 'A classic Italian pasta dish with a rich meat sauce.',
    ingredients: ['spaghetti', 'ground beef', 'tomato sauce', 'onion', 'garlic'],
    instructions: 'Cook spaghetti according to package instructions...',
    imageUrl: 'https://bakeitwithlove.com/wp-content/uploads/2022/01/Spaghetti-Bolognese-sq.jpg',
    category: 'Italian',
  },
  {
    id: 2,
    title: 'Chicken Curry',
    description: 'A spicy and flavorful chicken dish cooked in a rich curry sauce.',
    ingredients: ['chicken', 'curry powder', 'coconut milk', 'onion', 'garlic'],
    instructions: 'In a pan, cook chopped onion and garlic until softened...',
    imageUrl: 'https://th.bing.com/th/id/OIP.N_lyNbhtJvQbYPPup_CMlwHaHa?rs=1&pid=ImgDetMain',
    category: 'Indian',
  },
  {
    id: 3,
    title: 'Caesar Salad',
    description: 'A fresh salad with romaine lettuce, croutons, and Caesar dressing.',
    ingredients: ['romaine lettuce', 'croutons', 'Caesar dressing', 'parmesan cheese'],
    instructions: 'Toss romaine lettuce with Caesar dressing...',
    imageUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500/k/Photo/Recipes/2019-10-recipe-brussels-sprouts-caesar-salad/BrusselsSproutCaesarSaladOption1',
    category: 'Salad',
  },
  {
    id: 4,
    title: 'Chocolate Cake',
    description: 'A rich and moist chocolate cake topped with chocolate frosting.',
    ingredients: ['flour', 'cocoa powder', 'sugar', 'eggs', 'butter'],
    instructions: 'Preheat oven to 350°F (175°C)...',
    imageUrl: 'https://davidscookies.com/cdn/shop/files/cGGK3qk8.jpg?v=1738691344&width=493',
    category: 'Dessert',
  },
  {
    id: 5,
    title: 'Tacos',
    description: 'Soft or hard shell tacos filled with seasoned meat and toppings.',
    ingredients: ['taco shells', 'ground beef', 'lettuce', 'tomato', 'cheese'],
    instructions: 'Cook ground beef with taco seasoning...',
    imageUrl: 'https://cookingformysoul.com/wp-content/uploads/2024/04/feat-carne-asada-tacos-min.jpg',
    category: 'Mexican',
  },
  {
    id: 6,
    title: 'Vegetable Stir Fry',
    description: 'A quick and healthy stir fry with mixed vegetables and soy sauce.',
    ingredients: ['mixed vegetables', 'soy sauce', 'ginger', 'garlic'],
    instructions: 'Heat oil in a pan, add ginger and garlic...',
    imageUrl: 'https://therecipecritic.com/wp-content/uploads/2019/08/vegetable_stir_fry.jpg',
    category: 'Asian',
  },
];

const RecipeList: React.FC = () => {
  const allRecipes = getRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || recipe.category === category;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ['All', ...new Set(allRecipes.map((r) => r.category))];

  const categoryColor = (category: string) => {
    switch (category) {
      case 'Italian':
        return 'bg-blue-100 text-blue-800';
      case 'Indian':
        return 'bg-indigo-100 text-indigo-800';
      case 'Salad':
        return 'bg-cyan-100 text-cyan-800';
      case 'Dessert':
        return 'bg-sky-100 text-sky-800';
      case 'Mexican':
        return 'bg-teal-100 text-teal-800';
      case 'Asian':
        return 'bg-blue-200 text-blue-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-center mt-24 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-500 text-white py-4 rounded-xl shadow-md">
        🍴 Recipe Finder
      </h2>


      {/* Search + Filter */}
      <div className="mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
        <input
          type="text"
          placeholder="Search for a recipe..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Recipe Cards */}
      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500">No recipes found. Try another search or category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white border border-blue-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-2xl font-bold text-blue-600 mb-1">{recipe.title}</h3>
                <p className="text-gray-600 mb-2">{recipe.description}</p>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${categoryColor(recipe.category)}`}>
                  {recipe.category}
                </span>

                <div className="mb-3">
                  <h4 className="font-semibold text-gray-800">Ingredients:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Instructions:</h4>
                  <p className="text-sm text-gray-700">{recipe.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
