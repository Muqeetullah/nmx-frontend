import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      username
      role
      id
      borrowedBooks {
        name
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query Query {
    books {
      category
      isbn
      name
      price
      quantity
    }
  }
`;
