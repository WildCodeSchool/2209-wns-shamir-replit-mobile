// Description : Zone de la barre de gestion de fichier ouvert dans l'editeur
import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  isFocus: boolean;
  isSaveOnline: boolean;
};

const FileBar = ({ isSaveOnline }: Props) => {
  return (
    <View style={styles.container}>
      <Text>FileBar, {isSaveOnline ? "yes" : "no"}</Text>
    </View>
  );
};

export { FileBar };

const colorGreen = "green";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorGreen,
    height: 50,
  },
});
