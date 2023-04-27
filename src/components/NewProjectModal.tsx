import { TouchableOpacity, View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import {
  Button,
  Divider,
  Switch,
  TextInput,
} from "@react-native-material/core";
import { projectAPI } from "../api/projectAPI";
import { newProjectModalStyle } from "../styles/newProjectModal.style";
import { useGetProjects } from "../hooks/useGetProjects";

type NewProjectModalProps = {
  createProjectVisible: boolean;
  setCreateProjectVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewProjectModal = ({
  createProjectVisible,
  setCreateProjectVisible,
}: NewProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { getPersoProjects } = useGetProjects();

  const handleSubmitCreateProject = async () => {
    const newProject = {
      name: projectName,
      description: projectDescription,
      isPublic,
    };

    if (projectName.length > 0) {
      await projectAPI.create(newProject);
      setCreateProjectVisible(false);
      getPersoProjects();
      //ici call getFile
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={createProjectVisible}
      onRequestClose={() => {
        setCreateProjectVisible(!createProjectVisible);
      }}
    >
      <View style={newProjectModalStyle.centeredView}>
        <View style={newProjectModalStyle.modalView}>
          <Ionicons
            style={newProjectModalStyle.iconModal}
            name="close-circle-outline"
            onPress={() => setCreateProjectVisible(false)}
            size={45}
            color="black"
          />
          <Text style={newProjectModalStyle.modalTitle}>Create Project</Text>
          <TextInput
            label="Nom du projet"
            maxLength={20}
            style={newProjectModalStyle.inputForm}
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
            style={newProjectModalStyle.inputArea}
            onChange={(e) => setProjectDescription(e.nativeEvent.text)}
          />
          <TouchableOpacity
            style={newProjectModalStyle.inputSwitch}
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
  );
};

export default NewProjectModal;
