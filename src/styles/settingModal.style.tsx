import { StyleSheet } from "react-native";
import { variables } from "./_variables";

export const modalStyles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  iconModal: {
    alignSelf: "flex-end",
  },
  logout: { color: variables.colorWhite, fontSize: 20 },
  logoutBtn: {
    alignItems: "center",
    backgroundColor: variables.colorRed,
    borderRadius: 15,
    bottom: 20,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  modalTitle: {
    fontSize: 40,
    marginBottom: 15,
    position: "absolute",
    textAlign: "center",
    top: 15,
  },

  modalView: {
    alignItems: "center",
    backgroundColor: variables.colorWhite,
    borderRadius: 20,
    elevation: 5,
    flex: 1,
    margin: 20,
    padding: 20,
    shadowColor: variables.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
  },
});
