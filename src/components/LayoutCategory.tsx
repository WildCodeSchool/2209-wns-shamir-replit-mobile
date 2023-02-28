// Description: List des projets avec les catégories (perso, partagé, public)
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

// type Category = {
//   myProject: boolean;
//   projectShare: boolean;
//   publicProject: boolean;
// };

type Props = {
  name: string;
};

const LayoutCategory = ({ name }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

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
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export { LayoutCategory };

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
