import { StyleSheet } from "react-native";
import { variables } from "./_variables";

export const floatingMenuStyle = (BTN_SIZE: number) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: variables.colorGreen,
      borderRadius: BTN_SIZE / 2,
      height: BTN_SIZE,
      justifyContent: "center",
      position: "absolute",
      right: 20,
      width: BTN_SIZE,
      zIndex: 1,
    },
    createProject: {
      bottom: 100,
    },
    editorScreen: {
      bottom: 180,
    },
    projetScreen: {
      bottom: 20,
    },
    projectShortList: {
      zIndex: 2,
      top: 100,
    },
  });
