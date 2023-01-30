// Zone de la console pour l'editeur
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ConsoleArea = () => {
  return (
    <View style={styles.container}>
      <Text>ConsoleArea</Text>
    </View>
  );
};

export { ConsoleArea };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
