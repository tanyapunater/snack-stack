import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_RECIPE } from "../utils/mutations";

import Auth from "../utils/auth";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();

  // protect the page, only allow access if user is logged in, otherwise redirect to login page

  if (!Auth.loggedIn()) {
    navigate("/login");
  }

  // Mutation to add a recipe
  const [addRecipe] = useMutation(ADD_RECIPE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe = {
      title,
      description: description,
      ingredients: ingredients.split("\n").filter((i) => i.trim() !== ""),
      instructions: instructions.split("\n").filter((i) => i.trim() !== ""),
      category: category?.toLowerCase(),
      imgUrl,
    };

    addRecipe({
      variables: { input: newRecipe },
    })
      .then(() => {
        console.log("Recipe added successfully");
        // Reset the form
        setTitle("");
        setCategory("");
        setDescription("");
        setIngredients("");
        setInstructions("");
        setImgUrl("");

        // Navigate to Search Recipes
        navigate("/searchrecipes");
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-6 py-12 lg:px-8">
      {Auth.loggedIn() ? (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-center text-blue-700 mt-9 mb-9">
            Add a New Recipe
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-blue-800 font-semibold mb-1">
                Recipe Name
              </label>
              <input
                type="text"
                className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-semibold mb-1">
                Category
              </label>
              <select
                className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <div>
              <label className="block text-blue-800 font-semibold mb-1">
                Description
              </label>
              <textarea
                className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                placeholder="One per line"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-semibold mb-1">
                Ingredients
              </label>
              <textarea
                className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                placeholder="One per line"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-semibold mb-1">
                Instructions
              </label>
              <textarea
                className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                placeholder="One step per line"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </div>

            <div>
              <div>
                <label className="block text-blue-800 font-semibold mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  required
                />
              </div>

              {imgUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-blue-700 mb-2">
                    Image Preview:
                  </p>
                  <img
                    src={imgUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded shadow"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors"
            >
              Save Recipe
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            Please log in to add a recipe.
          </h2>
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Log In
          </a>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;
