import { gql } from "@apollo/client";

export const SUBSCRIBE_BOOK = gql`
  subscription BookAdded {
    bookAdded {
      category
      isbn
      name
      price
      quantity
    }
  }
`;
