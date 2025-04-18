// const typeDefs = `
//   type User {
//     _id: ID
//     username: String
//     email: String
//     password: String
//     thoughts: [Thought]!
//   }

//   type Thought {
//     _id: ID
//     thoughtText: String
//     thoughtAuthor: String
//     createdAt: String
//     comments: [Comment]!
//   }

//   type Comment {
//     _id: ID
//     commentText: String
//     createdAt: String
//   }

//   input ThoughtInput {
//     thoughtText: String!
//     thoughtAuthor: String!
//   }

//   input UserInput {
//     username: String!
//     email: String!
//     password: String!
//   }
  
//   type Auth {
//     token: ID!
//     user: User
//   }

//   type Query {
//     users: [User]
//     user(username: String!): User
//     thoughts: [Thought]!
//     thought(thoughtId: ID!): Thought
//     me: User
//   }

//   type Mutation {
//     addUser(input: UserInput!): Auth
//     login(email: String!, password: String!): Auth
//     addThought(input: ThoughtInput!): Thought
//     addComment(thoughtId: ID!, commentText: String!): Thought
//     removeThought(thoughtId: ID!): Thought
//     removeComment(thoughtId: ID!, commentId: ID!): Thought
//   }
// `;

// export default typeDefs;



const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    thoughts: [Thought]!
    createdAt: String!
    updatedAt: String!
  }

  type Thought {
    _id: ID!
    thoughtText: String!
    thoughtAuthor: String!
    createdAt: String!
    updatedAt: String!
    comments: [Comment]!
  }

  type Comment {
    commentText: String!
    createdAt: String!
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

  input ThoughtInput {
    thoughtText: String!
    thoughtAuthor: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
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
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(username: String!): User
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    me: User
    
    # Recipe queries
    getRecipes(category: String, search: String): [Recipe!]!
    getRecipeById(id: ID!): Recipe
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addThought(input: ThoughtInput!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    
    # Recipe mutations
    addRecipe(input: AddRecipeInput!): Recipe!
    updateRecipe(id: ID!, input: UpdateRecipeInput!): Recipe!
    deleteRecipe(id: ID!): Boolean!
  }
`;

export default typeDefs;