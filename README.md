# 🍽️ Snack Stack

Welcome to the **Snack Stack** – a recipe management application built with **React**, **React Router**, **Tailwind CSS**, and **TypeScript**. Users can search, view, and add delicious recipes, including uploading images, categorizing meals, and saving them locally in the browser.

## 🚀 Features

- ✅ User/Login Aunthentication
- 🔍 Search recipes by name or category  
- ➕ Add new recipes with ingredients, instructions, and image upload 
- 🗂️ Categorize recipes  
- 💾 Persist data using localStorage  
- 📄 View full recipe details on a separate page  
- 🧠 GraphQL integration ready for backend expansion  


## 🛠️ Tech Stack

- **React** (TypeScript)  
- **React Router DOM**  
- **Tailwind CSS**  
- **GraphQL** (Apollo Client - optional) 

## 🧪 How It Works

1. On the `SearchRecipes` page:   
   - User-added recipes are fetched from `localStorage`.  
   - Filtering works via search input and category dropdown.
   - A button to delete any created recipes  

2. On the `AddRecipe` page:  
   - Users enter a title, category, ingredients (one per line), and instructions (one step per line).  
   - Images are uploaded via an image source from a browser and are stored within the created recipe.  
   - Recipes are saved to `localStorage`.  

3. On the `RecipeDetails` page:  
   - The user will see the full recipe details on this separate page with the image they sourced from the internet.
   -  

## 🧩 Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/tanyapunater/snack-stack.git
cd snack-stack
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start the Development Server**

```bash
npm run start:dev
```

The app will be available at `(https://snack-stack-develop-branch.onrender.com)`.

## 🌐 GraphQL Backend (Optional)

- If using a GraphQL API, configure the endpoint in ApolloProvider.  
- Modify the `QUERY_SINGLE_RECIPE` in `queries.ts` accordingly.  
- If no backend is connected, localStorage will serve as the primary data source.  


## 📦 Future Enhancements

- ✅ Recipe editing and updating    
- ✅ Responsive design improvements
- ✅ User Profile enhancements    

---

Enjoy building and sharing delicious ideas with **Snack Stack**! 🍳


