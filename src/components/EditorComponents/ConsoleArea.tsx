// Zone de la console pour l'editeur
import { StyleSheet, Text, View } from "react-native";
import React from "react";

// type Props = {
//   isFocus: boolean;
// };

const ConsoleArea = () => (
  <View style={styles.container}>
    <Text style={styles.title}>ConsoleArea</Text>
    <View style={styles.containerCode}>
      <Text style={styles.bodyCode}>my return here</Text>
    </View>
  </View>
);

export { ConsoleArea };

const colorYellow = "black";
const colorWhite = "white";
const colorBlack = "black";
const styles = StyleSheet.create({
  bodyCode: {
    color: colorWhite,
  },
  container: {
    backgroundColor: colorYellow,
    flex: 1,
  },
  containerCode: {
    backgroundColor: colorBlack,
  },
  title: {
    fontSize: 35,
  },
});
