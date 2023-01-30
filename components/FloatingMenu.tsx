// Description: Floating menu pour l'écran d'accueil (bouton editeur et projet)
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppStackParamList } from "../Navigation";

const BTN_SIZE = 55;

type FloatingMenuProps = {
  goNav: (nav: keyof AppStackParamList) => void;
}
const FloatingMenu = ({goNav}: FloatingMenuProps) => {

  const handleNav = (nav: keyof AppStackParamList) => {
    goNav(nav);
  }
  return (
    <>
      <TouchableOpacity onPress={()=>handleNav("ProjectsScreen")} style={{...styles.container, bottom: 20}}>
        <Ionicons name="folder-open-outline" size={(BTN_SIZE / 4) * 2.5} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleNav("EditorScreen")} style={{...styles.container, bottom: 100}}>
        <Ionicons name="create-outline" size={(BTN_SIZE / 4) * 2.5} color="white" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: "absolute",
    width: BTN_SIZE,
    height: BTN_SIZE,
    right: 20,
    borderRadius: BTN_SIZE / 2,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { FloatingMenu };
