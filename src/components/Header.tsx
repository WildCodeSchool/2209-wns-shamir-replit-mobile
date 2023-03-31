// Ce fichier est utilisé pour afficher le header de l'application
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IsLoggedContext from "../contexts/isLoggedContext";
const Header = () => {
  const { setIsLogged } = useContext(IsLoggedContext);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLogged(false);
  };
  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.icons}
        name="settings-outline"
        onPress={() => setSettingsVisible(true)}
        size={35}
        color="white"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setSettingsVisible(!settingsVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              style={styles.iconModal}
              name="close-circle-outline"
              onPress={() => setSettingsVisible(false)}
              size={45}
              color="black"
            />
            <Text style={styles.modalTitle}>Settings</Text>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export { Header };

const colorMain = "#45c7c3";
const colorRed = "red";
const colorWhite = "white";
const shadowColor = "#000";
const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  container: {
    alignItems: "flex-end",
    backgroundColor: colorMain,
    height: 100,
    justifyContent: "center",
    top: 0,
    width: "100%",
  },
  iconModal: {
    alignSelf: "flex-end",
  },
  icons: {
    marginRight: 10,
    marginTop: 20,
  },
  logout: { color: colorWhite, fontSize: 20 },
  logoutBtn: {
    alignItems: "center",
    backgroundColor: colorRed,
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
    backgroundColor: colorWhite,
    borderRadius: 20,
    elevation: 5,
    flex: 1,
    margin: 20,
    padding: 20,
    shadowColor: shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
  },
});
