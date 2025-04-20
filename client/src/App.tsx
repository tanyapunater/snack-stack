import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";  // Import Header
import Footer from "./components/Footer";

// Construct the main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware to attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // Return headers with the authorization token
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
      <div className="bg-white">
        {/* Render Header globally */}
        <Header />

        <main>
        <main className="pt-24">  {/* adjust pt-24 as needed for spacing */}
  <Outlet />
</main>

          {/* Render the child routes here */}
          <Outlet />
        </main>

        {/* Render Footer globally */}
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
