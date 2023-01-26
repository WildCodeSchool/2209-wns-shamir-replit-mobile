import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { LoginStackParamList } from "../Navigation";

type Props = StackScreenProps<LoginStackParamList, "RegisterScreen">;

const RegisterScreen = ({ navigation }: Props) => {
  const goNav = (nav: keyof LoginStackParamList) => {
    navigation.navigate(nav);
  };
  return (
    <View style={styles.container}>
      <Text>RegisterScreen</Text>
      <TouchableOpacity onPress={() => goNav("LoginScreen")}>
        <Text>Déjà inscrit ? clique là</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
