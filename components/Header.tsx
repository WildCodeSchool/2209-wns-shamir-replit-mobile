import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IsLoggedContext from "../contexts/isLoggedContext";
const Header = () => {
 const { isLogged, setIsLogged } = useContext(IsLoggedContext);

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
              <Text style={{ color: "white", fontSize: 20 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export { Header };

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "red",
    height: 100,
    width: "100%",
    top: 0,
  },
  icons: {
    marginTop: 20,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "100%",
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    position: "absolute",
    top: 15,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 40,
  },
  iconModal: {
    alignSelf: "flex-end",
  },
  logoutBtn: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "red",
    width: "100%",
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
