// Description: This screen is the main screen of the app. It contains the categories of projects and the search bar.
import { StyleSheet, Text, View, TextInput } from "react-native";
import { LayoutCategory } from "../components/LayoutCategory";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { projectAPI } from "../api/projectAPI";
import { IProject } from "../interfaces/iProject";
import { ProjectList } from "../components/ProjectList";
type Props = StackScreenProps<AppStackParamList, "ProjectsScreen">;

// type Category = {
//   myProject: boolean;
//   projectShare: boolean;
//   publicProject: boolean;
// };

const ProjectsScreen = ({ navigation }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [myProjectVisible, setMyProjectVisible] = useState(false);
  const [sharedProjects, setSharedProjects] = useState(false);
  const [PublicProjects, setPublicProjects] = useState(false);
  const [projet, setProjet] = useState<IProject[]>();
  const [publics, setPublic] = useState<IProject[]>();

  const GetProjectById = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log(userId);
    if (userId != null) {
      const idUser = parseInt(userId, 10);
      setProjet(await projectAPI.getProjectByUserId(idUser));
    } else {
      console.error("probleme");
    }
  };

  const getPublicProjects = async () => {
    setPublic(await projectAPI.getPublicProjects());
    console.log("projetpublic", publics);
  };

  // getPublicProjects();

  useEffect(() => {
    console.log("ca passe ici ");
    GetProjectById();
    getPublicProjects();
  }, []);

  return (
    <LayoutApp navigation={navigation}>
      <View style={styles.container}>
        <Text>ProjectsScreen</Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchText}
          placeholder="Make a search"
          value={searchText}
        ></TextInput>
        <LayoutCategory
          name="My projects"
          isVisible={myProjectVisible}
          setIsVisible={setMyProjectVisible}
        />
        {myProjectVisible && projet !== undefined ? (
          <ProjectList data={projet} />
        ) : null}
        <LayoutCategory
          name="Shared projects"
          isVisible={sharedProjects}
          setIsVisible={setSharedProjects}
        />
        <LayoutCategory
          name="Public projects"
          isVisible={PublicProjects}
          setIsVisible={setPublicProjects}
        />
        {PublicProjects && publics !== undefined ? (
          <ProjectList data={publics} />
        ) : null}
      </View>
    </LayoutApp>
  );
};

export default ProjectsScreen;

const colorBg = "#F5FCFF";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorBg,
    flex: 1,
  },
  searchInput: {
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
});
