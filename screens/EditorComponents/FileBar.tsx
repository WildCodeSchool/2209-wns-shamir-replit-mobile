// Description : Zone de la barre de gestion de fichier ouvert dans l'editeur
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FileBar = () => {
  return (
    <View style={styles.container}>
      <Text>FileBar</Text>
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
