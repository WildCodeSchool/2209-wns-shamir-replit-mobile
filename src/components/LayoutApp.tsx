// Description: Layout de l'application contenant le header et le menu flottant
import { StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";
import { Header } from "./Header";
import { FloatingMenu } from "./FloatingMenu";
import { AppStackParamList } from "../Navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type LayoutAppProps = {
  children: ReactNode;
  navigation: StackNavigationProp<AppStackParamList>;
  getPersoProjects: () => void;
};
const LayoutApp = ({
  children,
  navigation,
  getPersoProjects,
}: LayoutAppProps) => {
  const goNav = (nav: keyof AppStackParamList) => {
    navigation.navigate(nav);
  };
  return (
    <>
      <Header />
      <View style={styles.childContainer}>{children}</View>
      <FloatingMenu goNav={goNav} getPersoProjects={getPersoProjects} />
    </>
  );
};

export { LayoutApp };

const styles = StyleSheet.create({
  childContainer: {
    flex: 1,
  },
});
