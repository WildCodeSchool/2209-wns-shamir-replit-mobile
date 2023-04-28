// Description: Layout de l'application contenant le header et le menu flottant
import { StyleSheet, View } from "react-native";
import React, { ReactNode, useState } from "react";
import { Header } from "./Header";
import { FloatingMenu } from "./FloatingMenu";
import { AppStackParamList } from "../Navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type LayoutAppProps = {
  children: ReactNode;
  navigation: StackNavigationProp<AppStackParamList>;
  routeName?: string;
};
const LayoutApp = ({ children, navigation, routeName }: LayoutAppProps) => {
  const goNav = (nav: keyof AppStackParamList) => {
    navigation.navigate(nav);
  };

  return (
    <>
      <Header />
      <View style={styles.childContainer}>{children}</View>
      <FloatingMenu goNav={goNav} routeName={routeName} />
    </>
  );
};

export { LayoutApp };

const styles = StyleSheet.create({
  childContainer: {
    flex: 1,
  },
});
