// Description: Floating menu pour l'écran d'accueil (bouton editeur et projet)
import { TouchableOpacity } from "react-native";
import ProjectContext from "../contexts/projectContext";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AppStackParamList } from "../Navigation";
import { useContext } from "react";
import { BubbleProject } from "./BubbleProject";
import NewProjectModal from "./NewProjectModal";
import { floatingMenuStyle } from "../styles/floatingMenu.style";

const BTN_SIZE = 55;

type FloatingMenuProps = {
  goNav: (nav: keyof AppStackParamList) => void;
  getPersoProjects: () => void;
};
const FloatingMenu = ({ goNav, getPersoProjects }: FloatingMenuProps) => {
  const { projectsShort } = useContext(ProjectContext);
  const [pListVisible, setpListVisible] = useState(false);
  const [createProjectVisible, setCreateProjectVisible] = useState(false);

  const handleNav = (nav: keyof AppStackParamList) => {
    goNav(nav);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleNav("ProjectsScreen");
          setpListVisible(false);
        }}
        style={[
          floatingMenuStyle(BTN_SIZE).container,
          floatingMenuStyle(BTN_SIZE).projetScreen,
        ]}
      >
        <Ionicons
          name="folder-open-outline"
          size={(BTN_SIZE / 4) * 2.5}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCreateProjectVisible(true)}
        style={[
          floatingMenuStyle(BTN_SIZE).container,
          floatingMenuStyle(BTN_SIZE).createProject,
        ]}
      >
        <AntDesign name="plus" size={(BTN_SIZE / 4) * 2.5} color="white" />
      </TouchableOpacity>
      <NewProjectModal
        createProjectVisible={createProjectVisible}
        setCreateProjectVisible={setCreateProjectVisible}
        getPersoProjects={getPersoProjects}
      />
      {pListVisible == true && (
        <BubbleProject
        // pListVisible={pListVisible}
        // setpListVisible={setpListVisible}
        />
      )}
      {projectsShort.length > 0 && (
        <>
          <TouchableOpacity
            onPress={() => setpListVisible(!pListVisible)}
            style={[
              floatingMenuStyle(BTN_SIZE).container,
              floatingMenuStyle(BTN_SIZE).editorScreen,
            ]}
          >
            <Ionicons
              name="create-outline"
              size={(BTN_SIZE / 4) * 2.5}
              color="white"
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export { FloatingMenu };
