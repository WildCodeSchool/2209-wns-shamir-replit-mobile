// Description: Composant parent de l'éditeur de code
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import { CodeArea } from "./EditorComponents/CodeArea";
import { FileBar } from "./EditorComponents/FileBar";
import { ConsoleArea } from "./EditorComponents/ConsoleArea";

type EditorScreenProps = StackScreenProps<AppStackParamList, "EditorScreen">;

const EditorScreen = ({ navigation }: EditorScreenProps) => {
  return (
    <LayoutApp navigation={navigation}>
      <FileBar />
      <CodeArea />
      <ConsoleArea />
    </LayoutApp>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({});
