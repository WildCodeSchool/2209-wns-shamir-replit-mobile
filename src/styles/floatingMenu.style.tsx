import { StyleSheet } from "react-native";
import { variables } from "./_variables";

export const floatingMenuStyle = (BTN_SIZE: number) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: variables.colorMainDark,
      borderRadius: BTN_SIZE / 2,
      justifyContent: "center",
      position: "absolute",
      height: BTN_SIZE,
      width: BTN_SIZE,
      right: 20,
      zIndex: 1,
    },
    executeCode: {
      bottom: 260,
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
    surface: {
      height: BTN_SIZE,
      width: BTN_SIZE,
      backgroundColor: variables.colorMainDark,
      borderBottomEndRadius: BTN_SIZE / 2,
      borderBottomStartRadius: BTN_SIZE / 2,
      borderTopEndRadius: BTN_SIZE / 2,
      borderTopStartRadius: BTN_SIZE / 2,
      elevation: 5,
      shadowColor: "black",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
