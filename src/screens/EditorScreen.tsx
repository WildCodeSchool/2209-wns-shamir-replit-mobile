// Description: Composant parent de l'éditeur de code
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import { CodeArea } from "../components/EditorComponents/CodeArea";
import { ConsoleArea } from "../components/EditorComponents/ConsoleArea";
import ProjectContext from "../contexts/projectContext";
import { FilesCodeData } from "../interfaces/IFile";
import { fileAPI } from "../api/fileAPI";
import { ScreenTitle } from "../components/ScreenTitle";
import CurrentProjectContext from "../contexts/currentProjectContext";
import EditorCodeContext from "../contexts/editorCodeContext";

type EditorScreenProps = StackScreenProps<AppStackParamList, "EditorScreen">;

const EditorScreen = ({ navigation, route }: EditorScreenProps) => {
  const { currentProject } = useContext(ProjectContext);
  const { currentProject: currentProjectGood } = useContext(
    CurrentProjectContext
  );
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const [usedFile, setUsedFile] = useState<FilesCodeData>();
  const { editorCode, setEditorCode } = useContext(EditorCodeContext);
  const [isSaveOnline, setIsSaveOnline] = useState(true);

  const changeFocus = (value: boolean) => {
    if (value !== isFocus) {
      setIsFocus(value);
    }
  };

  const updateSaveOnline = (value: boolean) => {
    setIsSaveOnline(value);
  };

  const updateFileCodeOnline = async (
    codeToPush: string,
    fileId: number,
    projectId: number
  ) => {
    if (usedFile) {
      try {
        return await fileAPI.updateFileOnline({
          codeToPush,
          fileId,
          projectId,
          socketId: "",
        });
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  const updateCode = (value: string) => {
    setEditorCode(value);
  };

  const getFilesInformations = async () => {
    const projectId = currentProject.id;
    if (projectId !== undefined) {
      const req = await fileAPI.getAllFilesByProjectId(projectId);

      setUsedFile(req.getCodeFiles[0]);

      if (editorCode !== req.getCodeFiles[0].code)
        updateCode(req.getCodeFiles[0].code);
    }
  };

  useEffect(() => {
    getFilesInformations();
  }, [currentProject]);

  return (
    <>
      {usedFile && editorCode ? (
        <LayoutApp navigation={navigation} routeName={route.name}>
          <ScreenTitle title={currentProject.name || ""} />
          <TouchableOpacity
            style={isFocus ? styles.container : styles.openContainer}
            onPress={() => changeFocus(false)}
            activeOpacity={1}
          >
            <CodeArea
              isFocus={isFocus}
              editorCode={editorCode}
              updateCode={updateCode}
              updateFileCodeOnline={updateFileCodeOnline}
              updateSaveOnline={updateSaveOnline}
              isSaveOnline={isSaveOnline}
              fileId={usedFile.id}
              projectId={usedFile?.projectId}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={isFocus ? styles.openContainer : styles.container}
            onPress={() => changeFocus(true)}
          >
            <ConsoleArea executionResult={currentProjectGood.executionResult} />
          </TouchableOpacity>
        </LayoutApp>
      ) : (
        <LayoutApp navigation={navigation}>
          <View style={[styles.waitingContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        </LayoutApp>
      )}
    </>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  openContainer: {
    flex: 6,
  },
  waitingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
