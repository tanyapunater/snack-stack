import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_RECIPE } from "../utils/queries"; // Import the query for fetching a single recipe

const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams(); // Get the recipeId from the URL parameters
  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
    variables: { id: recipeId }, //updated to use id
  });
  const recipe = data?.getRecipeById; //updating key to match the query

  if (loading) {
    return <div>Loading...</div>;
  }

  const error = useState(false);

  return (
    <div className="flex flex-auto items-center justify-center flex-col w-full h-full bg-gray-100 p-4">
      {recipe ? (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <div className="flex flex-col items-center mb-4">
            <h1 className="text-4xl font-extrabold mb-8 text-center mt-24 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-500 text-white py-4 rounded-xl shadow-md">
              {recipe.title}
            </h1>
            <img
              src={recipe.imgUrl} //updated to use imgUrl
              alt={recipe.title}
              className="mb-4 rounded-lg"
            />
            <p className="text-gray-700 mb-4">{recipe.description}</p>
            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside mb-4">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside mb-4">
              {Array.isArray(recipe.instructions) ? (
                recipe.instructions.map(
                  (instruction: string, index: number) => (
                    <li key={index}>{instruction}</li>
                  )
                )
              ) : (
                <li>No instructions available</li>
              )}
            </ol>
            <p className="text-gray-700 mb-4">Category: {recipe.category}</p>
          </div>
        </div>
      ) : null}
      {error && <p className="text-red-500">Error fetching recipe details.</p>}
    </div>
  );
};

export default RecipeDetails;
