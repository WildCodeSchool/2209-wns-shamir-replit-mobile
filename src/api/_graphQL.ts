// Initialisation  d'Apollo Client pour les requêtes GraphQL
import Constants from "expo-constants";
import {
  ApolloClient,
  InMemoryCache,
  ApolloClientOptions,
  DefaultOptions,
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
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

// On récupère le token de l'utilisateur
const getToken = async () => (await AsyncStorage.getItem("token")) || "{}";

// On exporte l'instance d'Apollo Client
export const api = async () => {
  // On initialise Apollo Client
  const params: ApolloClientOptions<unknown> = {
    uri: `${useUrl}/graphql`,
    cache: new InMemoryCache(),
    defaultOptions,
  };

  const token = await getToken();
  // On ajoute le token dans les headers de la requête
  if (token) params.headers = { Authorization: "Bearer " + token };

  return new ApolloClient(params);
};
