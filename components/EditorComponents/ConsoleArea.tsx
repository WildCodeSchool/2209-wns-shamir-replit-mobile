// Zone de la console pour l'editeur
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  isFocus: boolean;
};

const ConsoleArea = ({ isFocus }: Props) => {
  return (
    <View style={ styles.container }>
      <Text style={{ fontSize: 35 }}>ConsoleArea</Text>
      <View style={{ backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>my return here</Text>
      </View>
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
