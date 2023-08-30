// Description: Composant parent de l'éditeur de code
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import { CodeArea } from "../components/EditorComponents/CodeArea";
import { ConsoleArea } from "../components/EditorComponents/ConsoleArea";
import { FilesCodeData } from "../interfaces/IFile";
import { fileAPI } from "../api/fileAPI";
import { ScreenTitle } from "../components/ScreenTitle";
import CurrentProjectContext from "../contexts/currentProjectContext";
import EditorCodeContext from "../contexts/editorCodeContext";
import { Socket } from "socket.io-client";
import { websocket } from "../api/websocket";
import UserContext from "../contexts/userContext";
import ProjectContext from "../contexts/projectContext";
import { Coworker } from "../api/coworkerAPI";

type EditorScreenProps = StackScreenProps<AppStackParamList, "EditorScreen">;

const EditorScreen = ({ navigation, route }: EditorScreenProps) => {
  const { currentProject } = useContext(ProjectContext);
  const { currentProject: currentProjectGood } = useContext(
    CurrentProjectContext
  );
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const [forceEditorUpdate, setForceEditorUpdate] = useState(0);
  const [coworkers, setCoworkers] = useState<Coworker[]>([]);
  const previousEditorCode = useRef<string>("");
  const [usedFile, setUsedFile] = useState<FilesCodeData>();
  const { editorCode, setEditorCode } = useContext(EditorCodeContext);
  const [isSaveOnline, setIsSaveOnline] = useState(true);
  const { user } = useContext(UserContext);
  const websockets = useRef<Socket[]>([]);
  const [awaitCode, setAwaitCode] = useState<boolean>(false);

  const changeFocus = (value: boolean) => {
    if (value !== isFocus) {
      setIsFocus(value);
    }
  };

  const updateSaveOnline = (value: boolean) => {
    setIsSaveOnline(value);
  };

  // const updateFileCodeOnline = async (
  //   codeToPush: string,
  //   fileId: number,
  //   projectId: number
  // ) => {
  //   if (usedFile) {
  //     try {
  //       return await fileAPI.updateFileOnline({
  //         codeToPush,
  //         fileId,
  //         projectId,
  //         socketId: "",
  //       });
  //     } catch (e) {
  //       return false;
  //     }
  //   }
  //   return false;
  // };
  const websocketDisconnect = () => {
    websockets.current.map((socket) => {
      socket.close();
    });
  };

  const websocketConnect = async () => {
    websocketDisconnect();

    const userEmail = user.email;

    if (userEmail)
      websockets.current.push(
        await websocket.connect(
          { project_id: parseInt(currentProject.id || "0"), userEmail },
          setForceEditorUpdate,
          setCoworkers
        )
      );
  };

  const compareCodeLines = (oldCode: string, newCode: string) => {
    const splittedOldCode = oldCode.split("\n");
    const splittedNewCode = newCode.split("\n");

    const updatedLines =
      splittedOldCode.length !== splittedNewCode.length
        ? Array(splittedNewCode.length)
            .fill(undefined)
            .map((_, index) => index)
        : (splittedOldCode
            .map((oldLine, lineIndex) =>
              oldLine !== splittedNewCode[lineIndex] ? lineIndex : undefined
            )
            .filter((lineIndex) => lineIndex !== undefined) as number[]);

    return updatedLines;
  };
  const updateFileCodeOnline = async (
    codeToPush: string,
    fileId: number,
    projectId: number
  ) => {
    if (usedFile) {
      try {
        const socketIds = websockets.current.map((ws) => ws.id);
        console.log("socketsIds", socketIds);
        const updatedLines = compareCodeLines(
          previousEditorCode.current,
          codeToPush
        );
        const updateRes = await fileAPI.updateFileOnline(
          codeToPush,
          fileId,
          projectId,
          socketIds,
          updatedLines
        );
        previousEditorCode.current = codeToPush;
        return updateRes;
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
    setAwaitCode(false);
    const projectId = currentProject.id;
    if (projectId !== undefined) {
      const req = await fileAPI.getAllFilesByProjectId(projectId);
      setUsedFile(req.getCodeFiles[0]);

      if (editorCode !== req.getCodeFiles[0].code) {
        updateCode(req.getCodeFiles[0].code);
        setAwaitCode(true);
      }
    }
  };

  useEffect(() => {
    getFilesInformations();
    websocketConnect();
    return () => websocketDisconnect();
  }, [currentProject]);

  return (
    <>
      {usedFile && editorCode && awaitCode ? (
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
