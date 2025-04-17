import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetails } from '../components/RecipeDetails/RecipeDetails'; 

const RecipeDetails: React.FC = () => {

    const { recipeId } = useParams(); // Get the recipeId from the URL parameters

    interface Recipe {
            id: number
            title: string
            description: string
            ingredients: string[]
            instructions: string
            category: string
            imageUrl: string
          }

          const [recipe, setRecipe] = useState<Recipe | null>(null);
          const [error, setError] = useState(false);


            const fetchRecipeDetails = async () => {
                try {
                    if (recipeId) {
                        const data = await getRecipeDetails(recipeId);
                        setRecipe({ ...data, imageUrl: data.imageUrl || '' }); // Ensure imgUrl is included
                    } else {
                        console.error('Recipe ID is not defined');
                        setError(true);
                    }
                } catch (error) {
                    console.error('Error fetching recipe details:', error);
                    setError(true);
                }
            }
            
            useEffect(() => { 
                fetchRecipeDetails();
              }, [recipeId]);
              

    return (
        <div className="flex flex-auto items-center justify-center flex-col w-full h-full bg-gray-100 p-4">
            {   recipe ? (
                <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                    <div className="flex flex-col items-center mb-4">
                    <h1 className="text-4xl font-extrabold mb-8 text-center mt-24 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-500 text-white py-4 rounded-xl shadow-md">
                        {recipe.id}</h1>
                    <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
                    <img src={recipe.imageUrl} alt={recipe.title} className="mb-4 rounded-lg" />
                    <p className="text-gray-700 mb-4">{recipe.description}</p>
                    <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                    <ul className="list-disc list-inside mb-4">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                    <ol className="list-decimal list-inside mb-4">
                        {recipe.instructions.split('\n').map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                    <p className="text-gray-700 mb-4">Category: {recipe.category}</p>
                    </div>
                </div>
                ) : null
            }
            {error && <p className="text-red-500">Error fetching recipe details.</p>}
        </div>

    );
};
export default RecipeDetails;