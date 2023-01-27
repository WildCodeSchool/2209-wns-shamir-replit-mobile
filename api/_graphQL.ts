import Constants from "expo-constants";
import {
  ApolloClient,
  InMemoryCache,
  ApolloClientOptions,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultBackUrl = "http://localhost:5000";
const backUrl = `http://${Constants?.manifest?.extra?.BACK_URL}:${Constants?.manifest?.extra?.BACK_PORT}`;

const useUrl =
  Constants?.manifest?.extra?.BACK_URL && Constants?.manifest?.extra?.BACK_PORT
    ? backUrl
    : defaultBackUrl;


const params: ApolloClientOptions<unknown> = {
  uri: `${useUrl}/graphql`,
  cache: new InMemoryCache(),
};

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

const token = getToken();

if (token) params.headers = { Authorization: "Bearer " + token };

export const api = new ApolloClient(params);
