// Ce fichier est utilisé pour afficher le header de l'application
import { View, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { headerStyles } from "../styles/header.style";
import { SettingModal } from "./SettingModal";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const wildCodeOnlineLogo = require("../../assets/wildcodeonline.webp");

const Header = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <>
      <View style={headerStyles.container}>
        <View style={headerStyles.emptyView} />
        <Image
          resizeMethod="resize"
          style={headerStyles.logo}
          source={wildCodeOnlineLogo}
        />
        <Ionicons
          style={headerStyles.icons}
          name="settings-outline"
          onPress={() => setSettingsVisible(true)}
          size={35}
          color="white"
        />
      </View>
      <SettingModal
        settingsVisible={settingsVisible}
        setSettingsVisible={setSettingsVisible}
      />
    </>
  );
};

export { Header };
