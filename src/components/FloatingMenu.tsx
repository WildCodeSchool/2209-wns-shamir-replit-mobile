// Description: Floating menu pour l'écran d'accueil (bouton editeur et projet)
import { TouchableOpacity } from "react-native";
import ProjectContext from "../contexts/projectContext";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AppStackParamList } from "../Navigation";
import { useContext } from "react";
import { BallProjectList } from "./BallProjectList";
import NewProjectModal from "./NewProjectModal";
import { floatingMenuStyle } from "../styles/floatingMenu.style";
import { IProject } from "../interfaces/iProject";

const BTN_SIZE = 55;

type FloatingMenuProps = {
  goNav: (nav: keyof AppStackParamList) => void;
};
const FloatingMenu = ({ goNav }: FloatingMenuProps) => {
  const { projectsShort, setProjectsShort, setCurrentProject, currentProject } =
    useContext(ProjectContext);
  const [pListVisible, setpListVisible] = useState(false);
  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [pressedIndex, setPressedIndex] = useState<number | undefined>(
    undefined
  );

  const handleNav = (nav: keyof AppStackParamList) => {
    goNav(nav);
  };

  const handleOpenProject = async (projet: IProject) => {
    setCurrentProject(projet);
    goNav("EditorScreen");
  };

  const removeProjectShort = (project: IProject) => {
    console.log({ projectsShort });
    const updateProjectShort = projectsShort.filter((p) => p.id !== project.id);
    setProjectsShort(updateProjectShort);
    console.log({ updateProjectShort });
    if (updateProjectShort.length === 0 || currentProject.id === project.id) {
      goNav("ProjectsScreen");
    }
  };

  const style = floatingMenuStyle(BTN_SIZE);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleNav("ProjectsScreen");
          setpListVisible(false);
        }}
        onPressIn={() => setPressedIndex(1)}
        onPressOut={() => setPressedIndex(undefined)}
        style={{
          ...style.container,
          ...style.projetScreen,
          ...(pressedIndex === 1 ? null : style.surface),
        }}
        activeOpacity={0.5}
      >
        <Ionicons
          name="folder-open-outline"
          size={(BTN_SIZE / 4) * 2.5}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCreateProjectVisible(true);
        }}
        onPressIn={() => setPressedIndex(2)}
        onPressOut={() => setPressedIndex(undefined)}
        style={{
          ...style.container,
          ...style.createProject,
          ...(pressedIndex === 2 ? null : style.surface),
        }}
        activeOpacity={0.5}
      >
        <AntDesign name="plus" size={(BTN_SIZE / 4) * 2.5} color="white" />
      </TouchableOpacity>
      <NewProjectModal
        createProjectVisible={createProjectVisible}
        setCreateProjectVisible={setCreateProjectVisible}
      />
      {pListVisible == true && (
        <BallProjectList
          handleOpenProject={handleOpenProject}
          removeProjectShort={removeProjectShort}
        />
      )}
      {projectsShort.length > 0 && (
        <TouchableOpacity
          onPress={() => setpListVisible(!pListVisible)}
          onPressIn={() => setPressedIndex(3)}
          onPressOut={() => setPressedIndex(undefined)}
          style={{
            ...style.container,
            ...style.editorScreen,
            ...(pressedIndex === 3 ? null : style.surface),
          }}
          activeOpacity={0.5}
        >
          <Ionicons
            name="create-outline"
            size={(BTN_SIZE / 4) * 2.5}
            color="white"
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export { FloatingMenu };
