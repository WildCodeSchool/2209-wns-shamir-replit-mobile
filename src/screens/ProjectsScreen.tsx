// Description: This screen is the main screen of the app. It contains the categories of projects and the search bar.
import { View } from "react-native";
import { LayoutCategory } from "../components/LayoutCategory";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import React, { useContext, useEffect, useState } from "react";
import { IProject } from "../interfaces/iProject";
import { ProjectList } from "../components/ProjectList";
import { commonStyles } from "../styles/common.style";
import { ScreenTitle } from "../components/ScreenTitle";
import { TextInput } from "@react-native-material/core";
import ProjectListContext from "../contexts/projectListContext";
import { useGetProjects } from "../hooks/useGetProjects";
import Carousell from "../components/Carousel";
import { FilesCodeData } from "../interfaces/IFile";
type Props = StackScreenProps<AppStackParamList, "ProjectsScreen">;

const ProjectsScreen = ({ navigation }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [persoProjToggle, setPersoProjToggle] = useState(false);
  const [publicsProjToggle, setPublicsProjToggle] = useState(false);
  const [sharedProjToggle, setSharedProjToggle] = useState(false);

  const { projectList } = useContext(ProjectListContext);

  const { getPersoProjects, getPublicProjects } = useGetProjects();

  const [filteredPersoProjects, setFilteredPersoProjects] = useState<
    IProject[]
  >([]);
  const [filteredPublicProjects, setFilteredPublicProjects] = useState<
    IProject[]
  >([]);

  const goNav = (nav: keyof AppStackParamList) => {
    navigation.navigate(nav);
  };

  const filterByText = (text: string) => (project: IProject) => {
    const regexp = new RegExp(`${text}`, "i");
    return project.name.toLowerCase().match(regexp);
  };

  useEffect(() => {
    setFilteredPersoProjects(
      projectList.owned.filter(filterByText(searchText))
    );
    setFilteredPublicProjects(
      projectList.public.filter(filterByText(searchText))
    );
  }, [searchText, projectList]);

  useEffect(() => {
    getPersoProjects();
    getPublicProjects();
  }, [persoProjToggle, publicsProjToggle]);

  //filteredPersoProject
  return (
    <LayoutApp navigation={navigation}>
      <View style={commonStyles.containerTop}>
        <ScreenTitle title="Liste des projets" />
        <TextInput
          onChangeText={setSearchText}
          placeholder="Rechercher un projet"
          value={searchText}
          color="#00625f"
        />
        <LayoutCategory
          name="Mes Projets"
          isVisible={persoProjToggle}
          setIsVisible={setPersoProjToggle}
        />
        {persoProjToggle && filteredPersoProjects !== undefined ? (
          <>
            {/* <ProjectList data={filteredPersoProjects} goNav={goNav} /> */}
            <Carousell data={filteredPersoProjects} />
          </>
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
