import { Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { LoginStackParamList } from "../Navigation";
import { userAPI } from "../api/userAPI";
import { CreateUser } from "../interfaces/iUser";
import { commonStyles } from "../styles/common.style";

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
      // /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
      "azerty"
    );
    setEmailErrors(verifMail === null);
    setLoginErrors(verifLogin === null);
    setPasswordErrors(verifPassword === null);

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
      console.log("user", user);
      await userAPI.createUser(user);
      goNav("LoginScreen");
    }
  };

  return (
    <View style={commonStyles.containerCentered}>
      <Text style={commonStyles.title}>Inscription</Text>
      <TextInput
        style={
          emailErrors ? commonStyles.inputfieldsError : commonStyles.inputfields
        }
        onChangeText={setFieldMail}
        placeholder="Enter your mail"
        value={fieldMail}
        keyboardType="email-address"
      />
      <TextInput
        style={
          loginErrors ? commonStyles.inputfieldsError : commonStyles.inputfields
        }
        onChangeText={setFieldLogin}
        placeholder="Enter your login"
        value={fieldLogin}
      />
      <TextInput
        style={
          passwordErrors
            ? commonStyles.inputfieldsError
            : commonStyles.inputfields
        }
        onChangeText={setFieldPassword}
        placeholder="Enter your password"
        value={fieldPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={commonStyles.submitButton}
      >
        <Text style={{ fontSize: 15 }}>Envoyer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...commonStyles.submitButton, backgroundColor: "#FFF0" }}
        onPress={() => goNav("LoginScreen")}
      >
        <Text style={{ ...commonStyles.text, textDecorationLine: "underline" }}>
          Déjà inscrit ?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
