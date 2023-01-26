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

type Props = StackScreenProps<LoginStackParamList, "LoginScreen">;

const LoginScreen = ({ navigation }: Props) => {
  const { isLogged, setIsLogged } = useContext(IsLoggedContext);

  const [feildMail, setFeildMail] = useState("");
  const [feildPassword, setFeildPassword] = useState("");
  const handlePress = () => {
    // setIsLogged(true);
    console.log("logged");
  };

  const goNav = (nav: keyof LoginStackParamList) => {
    navigation.navigate(nav);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>
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
      <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
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
