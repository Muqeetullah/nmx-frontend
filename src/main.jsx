import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import "./index.css";
import client from "./Apollo/client.js";

const render = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
};

render();

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    render();
  });
}
