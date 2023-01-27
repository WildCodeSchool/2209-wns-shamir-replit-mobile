import Constants from "expo-constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";

// const defaultBackUrl = "http://localhost:5000";
// const backUrl = `http://${Constants?.manifest?.extra?.BACKEND_URL}:${Constants?.manifest?.extra?.BACK_PORT}`;

// const useUrl = Constants?.manifest?.extra?.BACKEND_URL && Constants?.manifest?.extra?.BACK_PORT ? backUrl : defaultBackUrl;

// const token = localStorage.getItem('token');
const useUrl = "http://192.168.1.16:5000";
export const api = new ApolloClient({
  uri: `${useUrl}/graphql`,
  cache: new InMemoryCache(),
});
