import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CodeArea = () => {
  return (
    <View style={styles.container}>
      <Text>CodeArea</Text>
    </View>
  );
};

export { CodeArea };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  }
});
