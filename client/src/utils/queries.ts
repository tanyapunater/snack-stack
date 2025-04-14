import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes {
        _id
        title
        description
        category
        createdAt
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query getRecipes($category: String, $search: String) {
    getRecipes(category: $category, search: $search) {
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

export const QUERY_SINGLE_RECIPE = gql`
  query getRecipeById($id: ID!) {
    getRecipeById(id: $id) {
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
        email
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      recipes {
        _id
        title
        description
        category
        createdAt
        updatedAt
      }
    }
  }
`;