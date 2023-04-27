import { StyleSheet } from "react-native";

export const newProjectModalStyle = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    flex: 1,
    margin: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
  },
  iconModal: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  modalTitle: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: "center",
    marginTop: 40,
  },
  inputForm: {
    width: "100%",
    marginBottom: 20,
  },
  inputArea: {
    fontSize: 20,
    width: "100%",
    marginBottom: 20,
    height: 100,
  },
  inputSwitch: {
    width: "100%",
    marginBottom: 20,
    fontSize: 20,

    paddingTop: 10,
    paddingLeft: 10,
  },
});
