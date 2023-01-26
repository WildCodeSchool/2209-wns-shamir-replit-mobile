import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { LoginStackParamList } from "../Navigation";

type Props = StackScreenProps<LoginStackParamList, "RegisterScreen">;

const RegisterScreen = ({ navigation }: Props) => {
  const [feildMail, setFeildMail] = useState("");
  const [feildPassword, setFeildPassword] = useState("");

  const goNav = (nav: keyof LoginStackParamList) => {
    navigation.navigate(nav);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={styles.inputfeilds}
        onChangeText={setFeildMail}
        placeholder="Enter your mail"
        value={feildMail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputfeilds}
        onChangeText={setFeildPassword}
        placeholder="Enter your password"
        value={feildPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.submitButton}>
        <Text style={{ fontSize: 15 }}>Connection</Text>
      </TouchableOpacity>
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
    margin: 12,
  },
  title: {
    fontSize: 40,
    alignSelf: "center",
  },
  inputfeilds: {
    fontSize: 20,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },
});
