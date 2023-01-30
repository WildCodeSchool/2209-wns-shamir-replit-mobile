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
import { userAPI } from "../api/userAPI";
import { CreateUser } from "../interfaces/iUser";

type Props = StackScreenProps<LoginStackParamList, "RegisterScreen">;

const RegisterScreen = ({ navigation }: Props) => {
  const [fieldMail, setFieldMail] = useState("");
  const [fieldLogin, setFieldLogin] = useState("");
  const [fieldPassword, setFieldPassword] = useState("");

  const [emailErrors, setEmailErrors] = useState(false);
  const [loginErrors, setLoginErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);

  const goNav = (nav: keyof LoginStackParamList) => {
    navigation.navigate(nav);
  };

  const verifyForm = () => {
    const verifMail = fieldMail.match(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    const verifLogin = fieldLogin.match(/^[a-zA-Z0-9_\-]{3,15}$/);
    const verifPassword = fieldPassword.match(
      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
    );
    setEmailErrors(verifMail === null);
    setLoginErrors(verifLogin === null);
    setPasswordErrors(verifPassword === null);
    console.log(verifMail, verifLogin, verifPassword)

    if (!verifMail || !verifLogin || !verifPassword) {
      return false;
    }

    return true;
  };
  const handleRegister = async () => {
    const isValidForm = verifyForm();
    if (isValidForm) {
      const user: CreateUser = {
        email: fieldMail,
        login: fieldLogin,
        password: fieldPassword,
      };
      await userAPI.createUser(user);
      goNav("LoginScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={emailErrors ? styles.inputfieldsError : styles.inputfields}
        onChangeText={setFieldMail}
        placeholder="Enter your mail"
        value={fieldMail}
        keyboardType="email-address"
      />
      <TextInput
        style={loginErrors ? styles.inputfieldsError : styles.inputfields}
        onChangeText={setFieldLogin}
        placeholder="Enter your login"
        value={fieldLogin}
      />
      <TextInput
        style={passwordErrors ? styles.inputfieldsError : styles.inputfields}
        onChangeText={setFieldPassword}
        placeholder="Enter your password"
        value={fieldPassword}
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
  inputfields: {
    fontSize: 20,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
  },
  inputfieldsError: {
    fontSize: 20,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
    borderColor: "red",
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
