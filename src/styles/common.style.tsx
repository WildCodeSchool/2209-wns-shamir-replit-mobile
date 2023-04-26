import { StyleSheet } from "react-native";
import { variables } from "./_variables";

const container = {
  flex: 1,
  padding: 12,
  backgroundColor: variables.colorBg,
};

export const commonStyles = StyleSheet.create({
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  containerCentered: {
    ...container,
    justifyContent: "center",
  },
  containerTop: {
    ...container,
    justifyContent: "flex-start",
  },
  inputfields: {
    fontSize: 20,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  inputfieldsError: {
    backgroundColor: "white",
    fontSize: 20,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
    borderColor: "red",
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#45c7c3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    padding: 10,
  },
});
