// Description: Zone de code pour l'éditeur
import { StyleSheet, ScrollView, View, ActivityIndicator } from "react-native";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";

import React, { useEffect } from "react";
import { updateRes } from "../../api/fileAPI";
// import CurrentProjectContext from "../../contexts/currentProjectContext";

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
}: Props) => {
  // const { currentProject: currentProjectGood, setCurrentProject } = useContext(
  //   CurrentProjectContext
  // );

  const updateEditText = async (value: string) => {
    updateSaveOnline(false);
    updateCode(value);

    // const fileCodeData = currentProjectGood.fileCodeData;

    // if (fileCodeData)
    //   setCurrentProject({
    //     ...currentProjectGood,
    //     fileCodeData: { ...fileCodeData, code: value },
    //   });
  };

  useEffect(() => {
    const willUpdate = setTimeout(async () => {
      const res = await updateFileCodeOnline(editorCode, fileId, projectId);
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

const colorBlue = "white";

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
