import { IsLoggedContextProvider } from "./contexts/isLoggedContext";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: `${Constants?.manifest?.extra?.BACK_URL}:${Constants?.manifest?.extra?.BACK_PORT}/graphql`,
  cache: new InMemoryCache(),
});

import Navigation from "./Navigation";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <IsLoggedContextProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </IsLoggedContextProvider>
    </ApolloProvider>
  );
}
