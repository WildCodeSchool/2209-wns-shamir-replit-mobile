// Description: Floating menu pour l'écran d'accueil (bouton editeur et projet)
import { TouchableOpacity } from "react-native";
import ProjectContext from "../contexts/projectContext";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AppStackParamList } from "../Navigation";
import { useContext } from "react";
import { BubbleProject } from "./BubbleProject";
import NewProjectModal from "./NewProjectModal";
import { floatingMenuStyle } from "../styles/floatingMenu.style";

const BTN_SIZE = 55;

type ButtonItem = {
  name: string;
  action: (buttonIndex: number) => JSX.Element;
};

type FloatingMenuProps = {
  goNav: (nav: keyof AppStackParamList) => void;
  routeName: string | undefined;
};

const FloatingMenu = ({ goNav, routeName }: FloatingMenuProps) => {
  const { projectsShort } = useContext(ProjectContext);
  const [pListVisible, setpListVisible] = useState(false);
  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [pressedIndex, setPressedIndex] = useState<number | undefined>(
    undefined
  );
  const [buttonList, setButtonList] = useState<ButtonItem[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const executeCode = () => {};

  const handleNav = (nav: keyof AppStackParamList) => {
    goNav(nav);
  };

  const style = floatingMenuStyle(BTN_SIZE);

  const executeCodeButton = (buttonIndex: number) => (
    <TouchableOpacity
      onPress={executeCode}
      onPressIn={() => setPressedIndex(4)}
      onPressOut={() => setPressedIndex(undefined)}
      style={{
        ...style.container,
        ...(pressedIndex === 4 ? null : style.surface),
        bottom: buttonIndex * 80 + 20,
      }}
      activeOpacity={0.5}
    >
      <AntDesign name="caretright" size={(BTN_SIZE / 4) * 2.5} color="white" />
    </TouchableOpacity>
  );

  const switchProjets = (buttonIndex: number) => (
    <>
      <TouchableOpacity
        onPress={() => setpListVisible(!pListVisible)}
        onPressIn={() => setPressedIndex(3)}
        onPressOut={() => setPressedIndex(undefined)}
        style={{
          ...style.container,
          ...(pressedIndex === 3 ? null : style.surface),
          bottom: buttonIndex * 80 + 20,
        }}
        activeOpacity={0.5}
      >
        <Ionicons
          name="create-outline"
          size={(BTN_SIZE / 4) * 2.5}
          color="white"
        />
      </TouchableOpacity>
    </>
  );

  const createNewProject = (buttonIndex: number) => (
    <>
      <TouchableOpacity
        onPress={() => {
          setCreateProjectVisible(true);
        }}
        onPressIn={() => setPressedIndex(2)}
        onPressOut={() => setPressedIndex(undefined)}
        style={{
          ...style.container,
          ...(pressedIndex === 2 ? null : style.surface),
          bottom: buttonIndex * 80 + 20,
        }}
        activeOpacity={0.5}
      >
        <AntDesign name="plus" size={(BTN_SIZE / 4) * 2.5} color="white" />
      </TouchableOpacity>
      <NewProjectModal
        createProjectVisible={createProjectVisible}
        setCreateProjectVisible={setCreateProjectVisible}
      />
    </>
  );

  const showProjectList = (buttonIndex: number) => (
    <TouchableOpacity
      onPress={() => {
        handleNav("ProjectsScreen");
        setpListVisible(false);
      }}
      onPressIn={() => setPressedIndex(1)}
      onPressOut={() => setPressedIndex(undefined)}
      style={{
        ...style.container,
        ...(pressedIndex === 1 ? null : style.surface),
        bottom: buttonIndex * 80 + 20,
      }}
      activeOpacity={0.5}
    >
      <Ionicons
        name="folder-open-outline"
        size={(BTN_SIZE / 4) * 2.5}
        color="white"
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    let initButtonList = [
      {
        name: "showProjectList",
        action: showProjectList,
      },
      {
        name: "createNewProject",
        action: createNewProject,
      },
      {
        name: "switchProjets",
        action: switchProjets,
      },
      {
        name: "executeCodeButton",
        action: executeCodeButton,
      },
    ];

    if (routeName !== "EditorScreen")
      initButtonList = initButtonList.filter(
        (button) => button.name !== "executeCodeButton"
      );

    if (projectsShort.length === 0)
      initButtonList = initButtonList.filter(
        (button) => button.name !== "switchProjets"
      );

    setButtonList(initButtonList);
  }, [projectsShort, routeName]);

  return (
    <>
      {pListVisible == true && (
        <BubbleProject
        // pListVisible={pListVisible}
        // setpListVisible={setpListVisible}
        />
      )}
      {buttonList.map((button, buttonIndex) => button.action(buttonIndex))}
    </>
  );
};

export { FloatingMenu };
