// Description : Zone de la barre de gestion de fichier ouvert dans l'editeur
import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  isFocus :boolean;
}

const FileBar = ({isFocus}: Props) => {
  return (
    <View style={styles.container}>
      <Text>FileBar, {isFocus}</Text>
    </View>
  );
};

export { FileBar };

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "green",
  },
});
