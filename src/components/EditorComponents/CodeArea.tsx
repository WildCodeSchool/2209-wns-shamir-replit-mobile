// Description: Zone de code pour l'éditeur
import { StyleSheet, ScrollView, View, ActivityIndicator } from "react-native";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";

import React, { useEffect } from "react";
import { updateRes } from "../../api/fileAPI";

type Props = {
  isFocus: boolean;
  editorCode: string;
  updateCode: (value: string) => void;
  fileId: number;
  projectId: number;
  isSaveOnline: boolean;
  updateFileCodeOnline: (
    codeToPush: string,
    fileId: number,
    projectId: number
  ) => Promise<false | updateRes | undefined>;
  updateSaveOnline: (value: boolean) => void;
};

const CodeArea = ({
  isFocus,
  editorCode,
  updateCode,
  updateFileCodeOnline,
  updateSaveOnline,
  fileId,
  projectId,
  isSaveOnline,
}: Props) => {
  const updateEditText = async (value: string) => {
    console.log("edit text", value, "isSaveOnline", isSaveOnline);
    updateSaveOnline(false);
    updateCode(value);
  };

  useEffect(() => {
    console.log("code update");
    console.log("3", editorCode);
    const willUpdate = setTimeout(async () => {
      console.log("4", editorCode);
      const res = await updateFileCodeOnline(editorCode, fileId, projectId);
      console.log("5", editorCode);
      if (res) updateSaveOnline(true);
    }, 2000);
    return () => clearTimeout(willUpdate);
  }, [editorCode]);

  return (
    <ScrollView style={styles.container}>
      {editorCode !== undefined || editorCode !== "" ? (
        <CodeEditor
          onChange={(value) => updateEditText(value)}
          style={styles.editorBody}
          language="javascript"
          syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
          showLineNumbers
          initialValue={editorCode}
          readOnly={isFocus}
        />
      ) : (
        <>
          <View style={[styles.waitingContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export { CodeArea };

const colorBlue = "blue";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorBlue,
    flex: 7,
  },
  editorBody: {
    fontSize: 18,
    highlighterLineHeight: 30,
    inputLineHeight: 30,
  },
  waitingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
