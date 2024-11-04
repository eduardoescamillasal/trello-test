import React from "react";
import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql", // Backend GraphQL endpoint
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);