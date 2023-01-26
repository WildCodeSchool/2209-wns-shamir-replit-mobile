import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
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
  const [formErrors, setFormErrors] = useState(false);

  const handleConnect = async () => {
    try {
      if (!fieldMail || !fieldPassword) {
        return setFormErrors(true);
      }
      const token = await authAPI.connect({
        email: fieldMail,
        password: fieldPassword,
      });
      await AsyncStorage.setItem("token", token);
      setIsLogged(true);
    } catch (e) {
      console.error(e);
    }
  };

  const goNav = (nav: keyof LoginStackParamList) => {
    navigation.navigate(nav);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>
      <TextInput
        style={formErrors ? styles.inputfieldsError : styles.inputfields}
        onChangeText={setFieldMail}
        placeholder="Enter your mail"
        value={fieldMail}
        keyboardType="email-address"
      />
      <TextInput
        style={formErrors ? styles.inputfieldsError : styles.inputfields}
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
