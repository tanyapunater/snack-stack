import { gql } from "@apollo/client";

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
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

export const GET_RECIPES = gql`
  query Query($category: String, $search: String) {
    getRecipes(category: $category, search: $search) {
      title
      instructions
      ingredients
      description
      createdBy {
        username
        _id
      }
      _id
    }
  }
`;

export const GET_SINGLE_RECIPE = gql`
  query GetRecipeById($getRecipeByIdId: ID!) {
    getRecipeById(id: $getRecipeByIdId) {
      title
      instructions
      ingredients
      description
      createdBy {
        username
        _id
      }
      category
      _id
    }
  }
`;

export const GET_MY_RECIPES = gql`
  query Query {
    me {
      username
      recipes {
        title
        instructions
        ingredients
        description
        category
        _id
      }
    }
  }
`;

// Thought Queries

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
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
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;
