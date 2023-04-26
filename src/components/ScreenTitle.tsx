import { Text, View } from "react-native";
import React from "react";
import { screenTitle } from "../styles/screenTitle.style";

type SettingModalProps = {
  title: string;
};

const ScreenTitle = ({ title }: SettingModalProps) => (
  <View style={screenTitle.container}>
    <Text style={screenTitle.text}>{title}</Text>
  </View>
);

export { ScreenTitle };
