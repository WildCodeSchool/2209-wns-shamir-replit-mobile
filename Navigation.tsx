import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import EditorScreen from "./screens/EditorScreen";
import LoginScreen from "./screens/LoginScreen";
import LostPasswordScreen from "./screens/LostPasswordScreen";
import ProfilScreen from "./screens/ProfilScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProjectsScreen from "./screens/ProjectsScreen";

import IsLoggedContext from "./contexts/isLoggedContext";
export type AppStackParamList = {
  EditorScreen: undefined;
  ProfilScreen: undefined;
  ProjectsScreen: undefined;
};

export type LoginStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LostPasswordScreen: undefined;
};

const AppStack = createStackNavigator<AppStackParamList>();
const LoginStack = createStackNavigator<LoginStackParamList>();

export default function Navigation() {
  const { isLogged, setIsLogged } = useContext(IsLoggedContext);
  const checkLoginStatus = () => {
    if (isLogged) {
      return true;
    } else {
      return false;
    }
  };

  // const checkToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("token");
  //     if (token) {
  //       setIsLogged(true);
  //     } else {
  //       setIsLogged(false);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   checkToken();
  // }, []);

  return (
    <>
      {checkLoginStatus() ? (
        <>
          <View style={styles.container}>
            <AppStack.Navigator>
              <AppStack.Screen
                name="ProjectsScreen"
                component={ProjectsScreen}
                options={{ headerShown: false }}
              />
              <AppStack.Screen
                name="EditorScreen"
                component={EditorScreen}
                options={{ headerShown: false }}
              />
              <AppStack.Screen
                name="ProfilScreen"
                component={ProfilScreen}
                options={{ headerShown: false }}
              />
            </AppStack.Navigator>
          </View>
        </>
      ) : (
        <LoginStack.Navigator initialRouteName="LoginScreen">
          <LoginStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <LoginStack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <LoginStack.Screen
            name="LostPasswordScreen"
            component={LostPasswordScreen}
            options={{ headerShown: false }}
          />
        </LoginStack.Navigator>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
