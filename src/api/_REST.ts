import axios, { RawAxiosRequestHeaders } from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// On defini l'url de l'api en fonction de l'environnement
const defaultBackUrl = "http://localhost:5000";
const backUrl = `http://${Constants?.manifest?.extra?.BACK_URL}:${Constants?.manifest?.extra?.BACK_PORT}`;

// Ternaire pour définir l'url de l'api avec les variables d'environnement
const useUrl =
  Constants?.manifest?.extra?.BACK_URL && Constants?.manifest?.extra?.BACK_PORT
    ? backUrl
    : defaultBackUrl;

// On récupère le token de l'utilisateur
const getToken = async () => (await AsyncStorage.getItem("token")) || "{}";

export const api = async () => {
  const token = await getToken();

  // On ajoute le token dans les headers de la requête
  const headers: RawAxiosRequestHeaders = {};

  if (token) headers.Authorization = "Bearer " + token;

  return axios.create({
    baseURL: `${useUrl}/api`,
    headers,
    // withCredentials: true,
  });
};
