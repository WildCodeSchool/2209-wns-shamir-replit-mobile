import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import IsLoggedContext from "../contexts/isLoggedContext";
import { StackScreenProps } from "@react-navigation/stack";
import { LoginStackParamList } from "../Navigation";

type Props = StackScreenProps<LoginStackParamList, "LoginScreen">;

const LoginScreen = ({ navigation }: Props) => {
  const { isLogged, setIsLogged } = useContext(IsLoggedContext);
  const handlePress = () => {
    setIsLogged(true);
  };

  const goNav = (nav: keyof LoginStackParamList) => {
    navigation.navigate(nav);
  };

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Connection</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goNav("RegisterScreen")}>
        <Text>pas encore inscrit ? clique ici</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goNav("LostPasswordScreen")}>
        <Text>Mot de passe oublié ? clique là</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
