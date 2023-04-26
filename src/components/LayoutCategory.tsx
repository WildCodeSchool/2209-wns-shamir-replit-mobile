// Description: List des projets avec les catégories (perso, partagé, public)
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

const LayoutCategory = ({ name, isVisible, setIsVisible }: Props) => {
  const toggleCategoryVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleCategoryVisibility}
    >
      <Ionicons
        name={
          isVisible
            ? "caret-down-circle-outline"
            : "caret-forward-circle-outline"
        }
        size={30}
        color="black"
      />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export { LayoutCategory };

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 3,
    marginBottom: 3,
  },
  text: {
    fontWeight: "bold",
  },
});
