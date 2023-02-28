// Description: Composant parent de l'éditeur de code
import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import { CodeArea } from "../components/EditorComponents/CodeArea";
import { FileBar } from "../components/EditorComponents/FileBar";
import { ConsoleArea } from "../components/EditorComponents/ConsoleArea";

type EditorScreenProps = StackScreenProps<AppStackParamList, "EditorScreen">;

const EditorScreen = ({ navigation }: EditorScreenProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(true);

  const changeFocus = (value: boolean) => {
    if (value !== isFocus) {
      setIsFocus(value);
    }
  };
  return (
    <LayoutApp navigation={navigation}>
      <FileBar isFocus={isFocus} />
      <TouchableOpacity
        style={isFocus ? styles.container : styles.openContainer}
        onPress={() => changeFocus(false)}
        activeOpacity={1}
      >
        <CodeArea isFocus={isFocus} />
      </TouchableOpacity>
      <TouchableOpacity
        style={isFocus ? styles.openContainer : styles.container}
        onPress={() => changeFocus(true)}
      >
        <ConsoleArea />
      </TouchableOpacity>
    </LayoutApp>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  openContainer: {
    flex: 6,
  },
});
