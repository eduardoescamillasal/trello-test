import React from "react";
import ReactDOM from "react-dom";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
// import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});


function App() {
  return (
    <div className='p-10 bg-kanban_bg'>
      {/* <Tasks /> */}
    </div>
  );
}

export default App;