// Description: Zone de code pour l'éditeur
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";

import React from "react";

type Props = {
  isFocus: boolean;
};

const CodeArea = ({ isFocus }: Props) => {
  const code: string = `
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
  `;

  return (
    <ScrollView style={styles.container}>
      <CodeEditor
        style={{
          fontSize: 18,
          inputLineHeight: 30,
          highlighterLineHeight: 30,
        }}
        language="javascript"
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
        showLineNumbers
        initialValue={code}
        readOnly={isFocus}
      />
    </ScrollView>
  );
};

export { CodeArea };

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: "blue",
  },
});
