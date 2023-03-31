// Description: This screen is the main screen of the app. It contains the categories of projects and the search bar.
import { StyleSheet, Text, View, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LayoutCategory } from "../components/LayoutCategory";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import React, { useEffect, useState } from "react";
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
  const [persoProjToggle, setPersoProjToggle] = useState(false);
  const [publicsProjToggle, setPublicsProjToggle] = useState(false);
  const [sharedProjToggle, setSharedProjToggle] = useState(false);

  const [persoProj, setPersoProj] = useState<IProject[]>([]);
  const [publicsProj, setPublicsProj] = useState<IProject[]>([]);
  // const [sharedProj, setSharedProj] = useState<IProject[]>();

  const goNav = (nav: keyof AppStackParamList) => {
    navigation.navigate(nav);
  };

  const getPersoProjects = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId != null) {
      const idUser = parseInt(userId, 10);
      const data = await projectAPI.getProjectByUserId(idUser);
      setPersoProj(data);
    } else {
      console.error("probleme");
    }
  };

  const getPublicProjects = async () => {
    setPublicsProj(await projectAPI.getPublicProjects());
  };

  useEffect(() => {
    getPersoProjects();
    getPublicProjects();
  }, [persoProjToggle, publicsProjToggle]);

  return (
    <LayoutApp navigation={navigation} getPersoProjects={getPersoProjects}>
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
          isVisible={persoProjToggle}
          setIsVisible={setPersoProjToggle}
        />
        {persoProjToggle && persoProj !== undefined ? (
          <ProjectList data={persoProj} goNav={goNav} />
        ) : null}
        <LayoutCategory
          name="Shared projects"
          isVisible={sharedProjToggle}
          setIsVisible={setSharedProjToggle}
        />
        <LayoutCategory
          name="Public projects"
          isVisible={publicsProjToggle}
          setIsVisible={setPublicsProjToggle}
        />
        {publicsProjToggle && publicsProj !== undefined ? (
          <ProjectList data={publicsProj} goNav={goNav} />
        ) : null}
      </View>
    </LayoutApp>
  );
};

export default ProjectsScreen;

const colorBg = "#c5e4e3";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorBg,
    flex: 1,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
});
