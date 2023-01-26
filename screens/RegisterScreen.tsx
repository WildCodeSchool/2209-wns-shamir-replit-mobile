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
import { authAPI } from "../api/authAPI";
import { CreateUser } from "../interfaces/iUser";

type Props = StackScreenProps<LoginStackParamList, "RegisterScreen">;

const RegisterScreen = ({ navigation }: Props) => {
  const [feildMail, setFeildMail] = useState("");
  const [feildLogin, setFeildLogin] = useState("");
  const [feildPassword, setFeildPassword] = useState("");

  const handleRegister = async () => {
    const user: CreateUser = {
      email: feildMail,
      login: feildLogin,
      password: feildPassword,
    };
    const result = await authAPI.createUser(user);
    console.log("result",result)
  };

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
        onChangeText={setFeildLogin}
        placeholder="Enter your login"
        value={feildLogin}
      />
      <TextInput
        style={styles.inputfeilds}
        onChangeText={setFeildPassword}
        placeholder="Enter your password"
        value={feildPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.submitButton}>
        <Text style={{ fontSize: 15 }}>Envoyer</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Déjà inscrit ?{" "}
        <Text
          onPress={() => goNav("LoginScreen")}
          style={{ textDecorationLine: "underline" }}
        >
          clique là
        </Text>
      </Text>
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
