import Constants from "expo-constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const defaultBackUrl = "http://localhost:5000";
const backUrl = `http://${Constants?.manifest?.extra?.BACKEND_URL}:${Constants?.manifest?.extra?.BACK_PORT}`;

const useUrl = Constants?.manifest?.extra?.BACKEND_URL && Constants?.manifest?.extra?.BACK_PORT ? backUrl : defaultBackUrl;

export const api = new ApolloClient({
  uri: `${useUrl}/graphql`,
  cache: new InMemoryCache(),
});
