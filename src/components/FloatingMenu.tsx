// Description: Floating menu pour l'écran d'accueil (bouton editeur et projet)
import { StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";
import ProjectContext from "../contexts/projectContext";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AppStackParamList } from "../Navigation";
import { useContext } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import {
  Button,
  Divider,
  Switch,
  TextInput,
} from "@react-native-material/core";
import { projectAPI } from "../api/projectAPI";
import { BallProjectList } from "./BallProjectList";

const BTN_SIZE = 55;

type FloatingMenuProps = {
  goNav: (nav: keyof AppStackParamList) => void;
  getPersoProjects: () => void;
};
const FloatingMenu = ({ goNav, getPersoProjects }: FloatingMenuProps) => {
  const { projectsShort } = useContext(ProjectContext);
  const [pListVisible, setpListVisible] = useState(false);
  const [createProjectVisible, setCreateProjectVisible] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleNav = (nav: keyof AppStackParamList) => {
    goNav(nav);
  };

  const handleSubmitCreateProject = async () => {
    const newProject = {
      name: projectName,
      description: projectDescription,
      isPublic,
    };

    if (
      projectName.length > 0 &&
      projectDescription.length > 0 &&
      isPublic !== undefined
    ) {
      await projectAPI.create(newProject);
      setCreateProjectVisible(false);
      getPersoProjects();
      //ici call getFile
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleNav("ProjectsScreen");
          setpListVisible(false);
        }}
        style={[styles.container, styles.projetScreen]}
      >
        <Ionicons
          name="folder-open-outline"
          size={(BTN_SIZE / 4) * 2.5}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCreateProjectVisible(true)}
        style={[styles.container, styles.createProject]}
      >
        <AntDesign name="plus" size={(BTN_SIZE / 4) * 2.5} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={createProjectVisible}
        onRequestClose={() => {
          setCreateProjectVisible(!createProjectVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              style={styles.iconModal}
              name="close-circle-outline"
              onPress={() => setCreateProjectVisible(false)}
              size={45}
              color="black"
            />
            <Text style={styles.modalTitle}>Create Project</Text>
            <TextInput
              label="Nom du projet"
              maxLength={20}
              style={styles.inputForm}
              onChange={(e) => setProjectName(e.nativeEvent.text)}
              trailing={() => (
                <Text style={{ fontSize: 15, width: 50, color: "grey" }}>
                  20 car
                </Text>
              )}
            />
            <TextInput
              multiline={true}
              numberOfLines={5}
              label="Description du projet"
              style={styles.inputArea}
              onChange={(e) => setProjectDescription(e.nativeEvent.text)}
            />
            <TouchableOpacity
              style={styles.inputSwitch}
              onPress={() => setIsPublic(!isPublic)}
            >
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>Public</Text>
                  <Switch
                    value={isPublic}
                    onValueChange={() => setIsPublic(!isPublic)}
                  />
                </View>

                <Divider style={{ marginTop: 10 }} leadingInset={1} />
              </>
            </TouchableOpacity>
            <Button
              title="Create"
              contentContainerStyle={{ fontSize: 20 }}
              trailing={(props) => <Icon name="send" {...props} />}
              onPress={handleSubmitCreateProject}
            />
          </View>
        </View>
      </Modal>
      {pListVisible ? <BallProjectList /> : null}
      {projectsShort.length > 0 ? (
        <>
          <TouchableOpacity
            onPress={() => setpListVisible(!pListVisible)}
            style={[styles.container, styles.editorScreen]}
          >
            <Ionicons
              name="create-outline"
              size={(BTN_SIZE / 4) * 2.5}
              color="white"
            />
          </TouchableOpacity>
        </>
      ) : null}
    </>
  );
};

const colorGreen = "green";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colorGreen,
    borderRadius: BTN_SIZE / 2,
    height: BTN_SIZE,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    width: BTN_SIZE,
    zIndex: 1,
  },
  createProject: {
    bottom: 100,
  },
  editorScreen: {
    bottom: 180,
  },
  projetScreen: {
    bottom: 20,
  },
  projectShortList: {
    zIndex: 2,
    top: 100,
  },
  iconModal: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  modalTitle: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: "center",
    marginTop: 40,
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    flex: 1,
    margin: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "100%",
  },
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    width: "100%",
  },
  inputForm: {
    width: "100%",
    marginBottom: 20,
  },
  inputArea: {
    fontSize: 20,
    width: "100%",
    marginBottom: 20,
    height: 100,
  },
  inputSwitch: {
    width: "100%",
    marginBottom: 20,
    fontSize: 20,

    paddingTop: 10,
    paddingLeft: 10,
  },
});

export { FloatingMenu };
