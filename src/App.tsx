import { IsLoggedContextProvider } from "./contexts/isLoggedContext";
import { ProjectContextProvider } from "./contexts/projectContext";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import React from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: `${Constants?.manifest?.extra?.BACK_URL}:${Constants?.manifest?.extra?.BACK_PORT}/graphql`,
  cache: new InMemoryCache(),
});

import Navigation from "./Navigation";
import { ProjectListContextProvider } from "./contexts/projectListContext";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ProjectListContextProvider>
        <IsLoggedContextProvider>
          <ProjectContextProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </ProjectContextProvider>
        </IsLoggedContextProvider>
      </ProjectListContextProvider>
    </ApolloProvider>
  );
}
