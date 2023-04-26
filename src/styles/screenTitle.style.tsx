import { StyleSheet } from "react-native";
import { variables } from "./_variables";

export const screenTitle = StyleSheet.create({
  container: {
    backgroundColor: variables.colorMain,
    marginTop: -22,
    marginLeft: -12,
    marginRight: -12,
    marginBottom: 0,
  },
  text: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: variables.colorMainDark,
    fontSize: 25,
    alignSelf: "center",
    marginBottom: 10,
  },
});
