// Description: Floating menu pour l'écran d'accueil (bouton editeur et projet)
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppStackParamList } from "../Navigation";

const BTN_SIZE = 55;

type FloatingMenuProps = {
  goNav: (nav: keyof AppStackParamList) => void;
};
const FloatingMenu = ({ goNav }: FloatingMenuProps) => {
  const handleNav = (nav: keyof AppStackParamList) => {
    goNav(nav);
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => handleNav("ProjectsScreen")}
        style={(styles.container, styles.projetScreen)}
      >
        <Ionicons
          name="folder-open-outline"
          size={(BTN_SIZE / 4) * 2.5}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNav("EditorScreen")}
        style={(styles.container, styles.editorScreen)}
      >
        <Ionicons
          name="create-outline"
          size={(BTN_SIZE / 4) * 2.5}
          color="white"
        />
      </TouchableOpacity>
    </>
  );
};

const colorGreen = "green";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colorGreen,
    borderRadius: BTN_SIZE / 2,
    height: BTN_SIZE,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    width: BTN_SIZE,
    zIndex: 1,
  },
  editorScreen: {
    bottom: 100,
  },
  projetScreen: {
    bottom: 20,
  },
});

export { FloatingMenu };
