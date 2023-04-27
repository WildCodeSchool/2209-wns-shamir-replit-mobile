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
};
const FloatingMenu = ({ goNav }: FloatingMenuProps) => {
  const { projectsShort } = useContext(ProjectContext);
  const [pListVisible, setpListVisible] = useState(false);
  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [pressedIndex, setPressedIndex] = useState<number | undefined>(
    undefined
  );

  const handleNav = (nav: keyof AppStackParamList) => {
    goNav(nav);
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
        <BubbleProject
        // pListVisible={pListVisible}
        // setpListVisible={setpListVisible}
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
