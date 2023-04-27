// Description: This screen is the main screen of the app. It contains the categories of projects and the search bar.
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LayoutCategory } from "../components/LayoutCategory";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import React, { useEffect, useState } from "react";
import { projectAPI } from "../api/projectAPI";
import { IProject } from "../interfaces/iProject";
import { ProjectList } from "../components/ProjectList";
import { commonStyles } from "../styles/common.style";
import { ScreenTitle } from "../components/ScreenTitle";
import { TextInput } from "@react-native-material/core";
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

  const [filteredPersoProjects, setFilteredPersoProjects] = useState<
    IProject[]
  >([]);
  const [filteredPublicProjects, setFilteredPublicProjects] = useState<
    IProject[]
  >([]);

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

  const filterByText = (text: string) => (project: IProject) => {
    const regexp = new RegExp(`${text}`, "i");
    return project.name.toLowerCase().match(regexp);
  };

  useEffect(() => {
    setFilteredPersoProjects(persoProj.filter(filterByText(searchText)));
    setFilteredPublicProjects(publicsProj.filter(filterByText(searchText)));
  }, [searchText, persoProj, publicsProj]);

  useEffect(() => {
    getPersoProjects();
    getPublicProjects();
  }, [persoProjToggle, publicsProjToggle]);

  return (
    <LayoutApp navigation={navigation} getPersoProjects={getPersoProjects}>
      <View style={commonStyles.containerTop}>
        <ScreenTitle title="Liste des projets" />
        <TextInput
          // style={commonStyles.searchInput}
          onChangeText={setSearchText}
          placeholder="Rechercher un projet"
          value={searchText}
        />
        <LayoutCategory
          name="Mes Projets"
          isVisible={persoProjToggle}
          setIsVisible={setPersoProjToggle}
        />
        {persoProjToggle && filteredPersoProjects !== undefined ? (
          <ProjectList data={filteredPersoProjects} goNav={goNav} />
        ) : null}
        <LayoutCategory
          name="Projets partagés avec moi"
          isVisible={sharedProjToggle}
          setIsVisible={setSharedProjToggle}
        />
        <LayoutCategory
          name="Projets publics"
          isVisible={publicsProjToggle}
          setIsVisible={setPublicsProjToggle}
        />
        {publicsProjToggle && filteredPublicProjects !== undefined ? (
          <ProjectList data={filteredPublicProjects} goNav={goNav} />
        ) : null}
      </View>
    </LayoutApp>
  );
};

export default ProjectsScreen;
