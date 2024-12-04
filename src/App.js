import "./App.css";
import Main from "./pages/Main/Main";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const link = new WebSocketLink({
    uri: "ws://localhost:4000/subscriptions",
    options: {
      reconnect: true,
      lazy: true,
    },
  });

  const client = new ApolloClient({
    link,
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Router>
        <Main></Main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
