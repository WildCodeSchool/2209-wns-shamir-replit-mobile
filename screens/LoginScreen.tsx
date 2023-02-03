// Description: Login screen
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import IsLoggedContext from "../contexts/isLoggedContext";
import { StackScreenProps } from "@react-navigation/stack";
import { LoginStackParamList } from "../Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../api/authAPI";

type Props = StackScreenProps<LoginStackParamList, "LoginScreen">;

const LoginScreen = ({ navigation }: Props) => {
  const { isLogged, setIsLogged } = useContext(IsLoggedContext);

  const [fieldMail, setFieldMail] = useState("");
  const [fieldPassword, setFieldPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);

  const handleConnect = async () => {
    try {
      setEmailErrors(fieldMail.length > 0 ? false : true);
      setPasswordErrors(fieldPassword.length > 0 ? false : true);

      if (fieldMail && fieldPassword) {
        const res = await authAPI.connect({
          email: fieldMail,
          password: fieldPassword,
        });

        if (res !== undefined) {
          await AsyncStorage.setItem("token", res.token);
          await AsyncStorage.setItem("userId", res.userId.toString());

          setIsLogged(true);
        } else {
          setEmailErrors(true);
          setPasswordErrors(true);
        }
      }
    } catch (e) {
      console.error("errer ici ", e);
    }
  };

  const goNav = (nav: keyof LoginStackParamList) => {
    navigation.navigate(nav);
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>
      <TextInput
        style={emailErrors ? styles.inputfieldsError : styles.inputfields}
        onChangeText={setFieldMail}
        placeholder="Enter your mail"
        value={fieldMail}
        keyboardType="email-address"
      />
      <TextInput
        style={passwordErrors ? styles.inputfieldsError : styles.inputfields}
        onChangeText={setFieldPassword}
        placeholder="Enter your password"
        value={fieldPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleConnect}>
        <Text style={{ fontSize: 15 }}>Connection</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Pas encore inscrit ?
        <Text
          style={{ textDecorationLine: "underline" }}
          onPress={() => goNav("RegisterScreen")}
        >
          {" "}
          clique ici
        </Text>
      </Text>
      <Text style={styles.text}>
        Mot de passe oublié ?{" "}
        <Text
          style={{ textDecorationLine: "underline" }}
          onPress={() => goNav("LostPasswordScreen")}
        >
          {" "}
          clique là
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

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
