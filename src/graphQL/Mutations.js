import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      role
      token
      username
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($input: CreateBookInput!) {
    addBook(input: $input) {
      quantity
      price
      name
      isbn
      category
    }
  }
`;

export const EDIT_BOOK = gql`
  mutation UpdateBook($input: UpdateBookInput!, $isbn: String!) {
    updateBook(input: $input, isbn: $isbn) {
      category
      isbn
      isbn
      name
      price
      quantity
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($isbn: String!) {
    deleteBook(isbn: $isbn) {
      category
      isbn
    }
  }
`;

export const ADD_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      role
    }
  }
`;
