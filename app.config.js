/* eslint-disable no-undef */
import "dotenv/config";

export default {
  expo: {
    name: "shamir-replit-react-native",
    slug: "shamir-replit-react-native",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      BACK_PORT: process.env.BACK_PORT,
      BACK_URL: process.env.BACK_URL,
    },
  },
};
