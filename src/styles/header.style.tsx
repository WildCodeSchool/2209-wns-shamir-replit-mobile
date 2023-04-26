import { StyleSheet } from "react-native";
import { variables } from "./_variables";

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: variables.colorMain,
    height: 100,
    justifyContent: "space-between",
    top: 0,
    width: "100%",
  },
  emptyView: { width: 35 },
  logo: { marginTop: 20, height: 44, width: 116 },
  icons: {
    marginRight: 10,
    marginTop: 20,
  },
});
