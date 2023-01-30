// Description: LostPasswordScreen
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { LoginStackParamList } from "../Navigation";

type Props = StackScreenProps<LoginStackParamList, "LostPasswordScreen">;

const LostPasswordScreen = ({ navigation }: Props) => {
  const goNav = (nav: keyof LoginStackParamList) => {
    navigation.navigate(nav);
  };
  return (
    <View style={styles.container}>
      <Text>LostPasswordScreen</Text>
      <TouchableOpacity onPress={() => goNav("RegisterScreen")}>
        <Text>pas encore inscrit ? clique ici</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goNav("LoginScreen")}>
        <Text>Déjà inscrit ? clique là</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LostPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
