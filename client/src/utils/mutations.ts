import { gql } from '@apollo/client';

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

export const ADD_RECIPE = gql`
  mutation addRecipe($input: RecipeInput!) {
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
  mutation updateRecipe($id: ID!, $input: RecipeInput!) {
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