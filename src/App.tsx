import { IsLoggedContextProvider } from "./contexts/isLoggedContext";
import { ProjectContextProvider } from "./contexts/projectContext";
import { ProjectListContextProvider } from "./contexts/projectListContext";
import { CurrentProjectContextProvider } from "./contexts/currentProjectContext";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import React from "react";
import Navigation from "./Navigation";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { EditorCodeContextProvider } from "./contexts/editorCodeContext";

const client = new ApolloClient({
  uri: `${Constants?.manifest?.extra?.BACK_URL}:${Constants?.manifest?.extra?.BACK_PORT}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <EditorCodeContextProvider>
        <CurrentProjectContextProvider>
          <ProjectListContextProvider>
            <IsLoggedContextProvider>
              <ProjectContextProvider>
                <NavigationContainer>
                  <Navigation />
                </NavigationContainer>
              </ProjectContextProvider>
            </IsLoggedContextProvider>
          </ProjectListContextProvider>
        </CurrentProjectContextProvider>
      </EditorCodeContextProvider>
    </ApolloProvider>
  );
}
