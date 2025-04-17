import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleViewRecipes = () => {
    navigate("/searchrecipes"); // update route if needed
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white text-black px-4 py-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center border-b pb-2">
        <h1 className="text-xl font-semibold">Snack Stack</h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-3xl font-bold mb-8">Welcome!</h2>
        <button
          onClick={handleViewRecipes}
          className="bg-gray-200 hover:bg-gray-300 text-xl font-semibold py-3 px-6 rounded border border-gray-400"
        >
          View Recipes
        </button>
      </div>
    </div>
  );
};

export default Welcome;
