

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]!
  }

  type Recipe {
    _id: ID!
    title: String!
    description: String
    ingredients: [String!]!
    instructions: [String!]!
    category: String!
    createdAt: String!
    updatedAt: String!
    createdBy: User!
  }

  input AddRecipeInput {
    title: String!
    description: String
    ingredients: [String!]!
    instructions: [String!]!
    category: String!
  }

  input UpdateRecipeInput {
    title: String
    description: String
    ingredients: [String!]
    instructions: [String!]
    category: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    getRecipeById(id: ID!): Recipe
    getRecipes(category: String, search: String): [Recipe!]!
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(input: AddRecipeInput!): Recipe!
    updateRecipe(id: ID!, input: UpdateRecipeInput!): Recipe!
    deleteRecipe(id: ID!): Boolean!
  }
`;

export default typeDefs;

