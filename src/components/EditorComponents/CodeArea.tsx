// Description: Zone de code pour l'éditeur
import { StyleSheet, ScrollView } from "react-native";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";

import React, { useEffect } from "react";
import { updateRes } from "../../api/fileAPI";

type Props = {
  isFocus: boolean;
  code: string;
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
  code,
  updateCode,
  updateFileCodeOnline,
  updateSaveOnline,
  fileId,
  projectId,
  isSaveOnline,
}: Props) => {
  const getEditorText = (value: string) => {
    if (value !== code) {
      updateCode(value);
      updateSaveOnline(false);
    }
  };
  useEffect(() => {
    if (isSaveOnline === false) {
      const willUpdate = setTimeout(async () => {
        const res = await updateFileCodeOnline(code, fileId, projectId);
        if (res !== false && res !== undefined) updateSaveOnline(true);
      }, 2000);
      return () => clearTimeout(willUpdate);
    }
  }, [code]);

  return (
    <ScrollView style={styles.container}>
      <CodeEditor
        onChange={(value) => getEditorText(value)}
        style={styles.editorBody}
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
});
