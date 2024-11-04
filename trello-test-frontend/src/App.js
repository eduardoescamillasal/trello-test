import React from "react";
import {gql, useQuery} from "@apollo/client";

const TEST_QUERY = gql`
  query {
    hello
  }
`;

function App() {
  const {loading, error, data} = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='p-10 bg-kanban_bg'>
      <h1>GraphQL Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
