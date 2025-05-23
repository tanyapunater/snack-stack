import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Construct the main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Attach JWT token to each request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 min-h-screen flex flex-col">
        {/* Global Header */}
        <Header />

        {/* Main content */}
        <main>
          <Outlet />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
