import { Text, View, Modal, Alert, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IsLoggedContext from "../contexts/isLoggedContext";
import { modalStyles } from "../styles/settingModal.style";
import UserContext from "../contexts/userContext";
import ProjectContext from "../contexts/projectContext";

type SettingModalProps = {
  settingsVisible: boolean;
  setSettingsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingModal = ({
  settingsVisible,
  setSettingsVisible,
}: SettingModalProps) => {
  const { setIsLogged } = useContext(IsLoggedContext);
  const {  setUser } = useContext(UserContext);
  const { setCurrentProject} = useContext(ProjectContext)
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");

    setUser({});
    setIsLogged(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={settingsVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setSettingsVisible(!settingsVisible);
      }}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Ionicons
            style={modalStyles.iconModal}
            name="close-circle-outline"
            onPress={() => setSettingsVisible(false)}
            size={45}
            color="black"
          />
          <Text style={modalStyles.modalTitle}>Settings</Text>
          <TouchableOpacity
            style={modalStyles.logoutBtn}
            onPress={handleLogout}
          >
            <Text style={modalStyles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export { SettingModal };
