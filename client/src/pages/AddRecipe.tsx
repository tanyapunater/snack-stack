import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imgBase64, setImgBase64] = useState("");
  const navigate = useNavigate();

  // Convert file to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImgBase64(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipe = {
      title,
      description: "",
      ingredients: ingredients.split("\n").filter((i) => i.trim() !== ""),
      instructions: instructions.split("\n").filter((i) => i.trim() !== ""),
      category,
      imgUrl: imgBase64, // store base64 image
    };

    const storedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    localStorage.setItem("recipes", JSON.stringify([...storedRecipes, recipe]));

    console.log("Saved:", recipe);

    // Clear form
    setTitle("");
    setCategory("");
    setIngredients("");
    setInstructions("");
    setImgBase64("");

    // Go to search page
    navigate("/searchrecipes");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Snack Stack</h2>
        </div>

        <h3 className="text-xl font-bold text-center mb-6">Add Recipe</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Recipe Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              className="w-full border rounded px-3 py-2"
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
            <label className="block font-medium mb-1">Ingredients</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="One per line"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Instructions</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="One step per line"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Image Upload</label>
            <div className="w-full border border-dashed border-gray-400 rounded px-3 py-4 text-center bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: JPG, PNG, GIF
              </p>
            </div>

            {imgBase64 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Image Preview:</p>
                <img
                  src={imgBase64}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded shadow"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
