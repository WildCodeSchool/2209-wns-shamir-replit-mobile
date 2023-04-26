// Description: Login screen
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import IsLoggedContext from "../contexts/isLoggedContext";
import { StackScreenProps } from "@react-navigation/stack";
import { LoginStackParamList } from "../Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../api/authAPI";
import { commonStyles } from "../styles/common.style";

type Props = StackScreenProps<LoginStackParamList, "LoginScreen">;

const LoginScreen = ({ navigation }: Props) => {
  const { setIsLogged } = useContext(IsLoggedContext);

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
      console.error("error ici ", e);
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
    <View style={commonStyles.containerCentered}>
      <Text style={commonStyles.title}>Connection</Text>
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
        style={commonStyles.submitButton}
        onPress={handleConnect}
      >
        <Text style={{ fontSize: 15 }}>Connection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...commonStyles.submitButton, backgroundColor: "white" }}
        onPress={() => goNav("RegisterScreen")}
      >
        <Text style={{ fontSize: 15 }}>Inscription</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...commonStyles.submitButton, backgroundColor: "#FFF0" }}
        onPress={() => goNav("LostPasswordScreen")}
      >
        <Text style={{ ...commonStyles.text, textDecorationLine: "underline" }}>
          Mot de passe oublié
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

// const styles = StyleSheet.create({
//   title: commonStyles.title,
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 12,
//     backgroundColor: "#c5e4e3",
//   },
//   inputfields: {
//     fontSize: 20,
//     height: 50,
//     borderWidth: 1,
//     marginBottom: 20,
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: "white",
//   },
//   inputfieldsError: {
//     backgroundColor: "white",
//     fontSize: 20,
//     height: 50,
//     borderWidth: 1,
//     marginBottom: 20,
//     borderRadius: 5,
//     padding: 10,
//     borderColor: "red",
//   },
//   submitButton: {
//     alignItems: "center",
//     backgroundColor: "#45c7c3",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 15,
//     textAlign: "center",
//   },
// });
