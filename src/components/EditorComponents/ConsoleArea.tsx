// Zone de la console pour l'editeur
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ExecutedCode } from "../../api/executeCodeAPI";

type ConsoleAreaProps = {
  executionResult:
    | {
        result: ExecutedCode[];
        nbExecutions: number | undefined;
      }
    | undefined;
};

const ConsoleArea = ({ executionResult }: ConsoleAreaProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>ConsoleArea</Text>
    <View style={styles.containerCode}>
      {executionResult &&
        executionResult.result.map((res, resIndex) => (
          <Text
            key={resIndex}
            style={{ ...styles.bodyCode, ...styles[res.type] }}
          >
            {res.message}
          </Text>
        ))}
    </View>
  </View>
);

export { ConsoleArea };

const colorYellow = "black";
const colorWhite = "white";
const colorBlack = "black";
const styles = StyleSheet.create({
  bodyCode: {},
  error: {
    color: "red",
  },
  info: {
    color: "blue",
  },
  log: {
    color: colorWhite,
  },
  warn: {
    color: "yellow",
  },
  container: {
    backgroundColor: colorYellow,
    flex: 1,
  },
  containerCode: {
    backgroundColor: colorBlack,
    paddingLeft: 5,
  },
  title: {
    fontSize: 35,
  },
});
