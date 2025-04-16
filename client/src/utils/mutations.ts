import { gql } from "@apollo/client";

// User Authentication Mutations
export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// User Authentication Mutations
export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

<<<<<<< HEAD
// Thought-related Mutations
=======
// Recipe Mutations

export const ADD_RECIPE = gql`
  mutation AddRecipe($input: AddRecipeInput!) {
    addRecipe(input: $input) {
      title
      instructions
      ingredients
      description
      createdBy {
        username
        _id
      }
      category
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation Mutation($updateRecipeId: ID!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $updateRecipeId, input: $input) {
      title
      instructions
      ingredients
      createdBy {
        username
        _id
      }
      category
      description
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;

// Thought-related Mutations

>>>>>>> ef15d469b720defa77652adf5f0ba9a9f78cfbf0
export const ADD_THOUGHT = gql`
  mutation AddThought($input: ThoughtInput!) {
    addThought(input: $input) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

// Recipe-related Mutations
export const ADD_RECIPE = gql`
  mutation addRecipe($input: AddRecipeInput!) {
    addRecipe(input: $input) {
      _id
      title
      description
      ingredients
      instructions
      category
      createdAt
      updatedAt
      createdBy {
        _id
        username
      }
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation updateRecipe($id: ID!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $id, input: $input) {
      _id
      title
      description
      ingredients
      instructions
      category
      updatedAt
      createdBy {
        _id
        username
      }
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;