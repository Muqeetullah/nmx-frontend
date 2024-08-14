import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";

import { getMainDefinition } from "@apollo/client/utilities/index.js";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions/index.js";
import { createClient } from "graphql-ws";

// Function to get the auth token from local storage
const getAuthToken = () => {
  const token = localStorage.getItem("userData");
  return JSON.parse(token)?.token;
};

// Create an HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: "http://10.0.0.113:4000/graphql", // Replace with your GraphQL endpoint

  headers: {
    Authorization: `Bearer ${getAuthToken()}`, // Pass the auth token here
  },
});

// Create a WebSocket link for subscriptions
// const wsLink = new WebSocketLink({
//   uri: `ws://10.0.0.113:4000/subscription`, // Replace with your WebSocket endpoint
//   options: {
//     reconnect: true,
//     connectionParams: {
//       headers: {
//         Authorization: `Bearer ${getAuthToken()}`, // Pass the auth token here
//       },
//     },
//   },
// });
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://10.0.0.113:4000/subscription",
    connectionParams: {
      authToken: `Bearer ${getAuthToken()}`,
    },
  })
);
// Use split to direct traffic between the WebSocket and HTTP links
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Create the Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
