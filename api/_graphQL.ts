// Initialisation  d'Apollo Client pour les requêtes GraphQL
import Constants from "expo-constants";
import {
  ApolloClient,
  InMemoryCache,
  ApolloClientOptions,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// On defini l'url de l'api en fonction de l'environnement
const defaultBackUrl = "http://localhost:5000";
const backUrl = `http://${Constants?.manifest?.extra?.BACK_URL}:${Constants?.manifest?.extra?.BACK_PORT}`;

// Ternaire pour définir l'url de l'api avec les variables d'environnement
const useUrl =
  Constants?.manifest?.extra?.BACK_URL && Constants?.manifest?.extra?.BACK_PORT
    ? backUrl
    : defaultBackUrl;

// On initialise Apollo Client
const params: ApolloClientOptions<unknown> = {
  uri: `${useUrl}/graphql`,
  cache: new InMemoryCache(),
};

// On récupère le token de l'utilisateur
const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

const token = getToken();
console.log("youhou", token);

// On ajoute le token dans les headers de la requête
if (token) params.headers = { Authorization: "Bearer " + token };

// On exporte l'instance d'Apollo Client
export const api = new ApolloClient(params);
