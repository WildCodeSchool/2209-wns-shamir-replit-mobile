// Description: ProfilScreen
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";

type ProfilScreenProps = StackScreenProps<AppStackParamList, "ProfilScreen">;

const ProfilScreen = ({ navigation }: ProfilScreenProps) => {
  return (
    <LayoutApp navigation={navigation}>
      <View>
        <Text>ProfilScreen</Text>
      </View>
    </LayoutApp>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({});
