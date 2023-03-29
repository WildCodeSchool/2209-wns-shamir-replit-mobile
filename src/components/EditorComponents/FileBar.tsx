// Description : Zone de la barre de gestion de fichier ouvert dans l'editeur
import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  isFocus: boolean;
};

const FileBar = ({ isFocus }: Props) => (
  <View style={styles.container}>
    <Text>FileBar, {isFocus}</Text>
  </View>
);

export { FileBar };

const colorGreen = "green";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorGreen,
    height: 50,
  },
});
