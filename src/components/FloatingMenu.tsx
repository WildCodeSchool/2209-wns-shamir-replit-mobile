// Description: Floating menu pour l'écran d'accueil (bouton editeur et projet)
import { TouchableOpacity } from "react-native";
import ProjectContext from "../contexts/projectContext";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AppStackParamList } from "../Navigation";
import { useContext } from "react";
import { BallProjectList } from "./BallProjectList";
import NewProjectModal from "./NewProjectModal";
import { floatingMenuStyle } from "../styles/floatingMenu.style";
import { IProject } from "../interfaces/iProject";
import { executeCodeAPI } from "../api/executeCodeAPI";
import CurrentProjectContext from "../contexts/currentProjectContext";
import EditorCodeContext from "../contexts/editorCodeContext";

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
  const { projectsShort, setProjectsShort, setCurrentProject, currentProject } =
    useContext(ProjectContext);
  const { currentProject: currentProject2, setCurrentProject: setCurrentProject2 } = useContext(
    CurrentProjectContext
  );
  const { editorCode } = useContext(EditorCodeContext);

  const [pListVisible, setpListVisible] = useState(false);
  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [pressedIndex, setPressedIndex] = useState<number | undefined>(
    undefined
  );
  const [buttonList, setButtonList] = useState<ButtonItem[]>([]);

  const executeCode = async () => {
    const code = editorCode;
    const projectId = currentProject.id;
    console.log("executedCode", code, projectId);

    if (code && projectId) {
      const executedCode = (
        await executeCodeAPI.sendCode(code, parseInt(projectId, 10))
      ).data;

      console.log("executedCode", executedCode);

      if (executedCode)
        setCurrentProject2({ ...currentProject, executionResult: executedCode });
    }
  };

  const handleNav = (nav: keyof AppStackParamList) => {
    goNav(nav);
  };

  const handleOpenProject = async (projet: IProject) => {
    console.log("----------Open--------");
    if (currentProject.id === projet.id && routeName === "EditorScreen") {
      setpListVisible(false);
      console.log("----------Project Already Open--------");
    }

    if (currentProject.id !== projet.id && routeName === "EditorScreen") {
      setCurrentProject(projet);
      console.log("----------Project load in Editor --------");
    }
    if (currentProject.id !== projet.id && routeName !== "EditorScreen") {
      setCurrentProject(projet);
      goNav("EditorScreen");
      console.log("----------Project load in Editor --------");
    }
  };

  const removeProjectShort = (project: IProject) => {
    console.log("name : ", project.name);
    if (currentProject.id === project.id && routeName === "EditorScreen") {
      const arrRemovedProj = projectsShort.filter((p) => p.id !== project.id);
      console.log("listproj", arrRemovedProj);
      setpListVisible(false);
      setProjectsShort([]);
      setProjectsShort(arrRemovedProj);
      goNav("ProjectsScreen");
      console.log("---------- IF--------");
    } else {
      const arrRemovedProj = projectsShort
        .filter((p) => p.id !== project.id)
        .map((p) => ({ ...p }));
      setProjectsShort([]);
      setProjectsShort(arrRemovedProj);
      if (arrRemovedProj.length === 0) setpListVisible(false);
      console.log("----------Else--------");
    }
  };

  const style = floatingMenuStyle(BTN_SIZE);

  const executeCodeButton = (buttonIndex: number) => (
    <TouchableOpacity
      key={buttonIndex}
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

  const switchProjets = (buttonIndex: number, pListVisible: boolean) => (
    <TouchableOpacity
      key={buttonIndex}
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
      <Feather name="layers" size={(BTN_SIZE / 4) * 2.5} color="white" />
    </TouchableOpacity>
  );

  const createNewProject = (buttonIndex: number) => (
    <TouchableOpacity
      key={buttonIndex}
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
  );

  const showProjectList = (buttonIndex: number) => (
    <TouchableOpacity
      key={buttonIndex}
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
    console.log("enter UseEffect", routeName);
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
        action: (indexBtn: number) => switchProjets(indexBtn, pListVisible),
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

    if (projectsShort.length === 0) {
      console.log("this case");
      initButtonList = initButtonList.filter(
        (button) => button.name !== "switchProjets"
      );
    }

    setButtonList(initButtonList);
  }, [projectsShort, routeName, pListVisible]);

  return (
    <>
      <NewProjectModal
        createProjectVisible={createProjectVisible}
        setCreateProjectVisible={setCreateProjectVisible}
      />
      {buttonList.map((button, buttonIndex) => button.action(buttonIndex))}
      {pListVisible == true && (
        <BallProjectList
          handleOpenProject={handleOpenProject}
          removeProjectShort={removeProjectShort}
        />
      )}
    </>
  );
};

export { FloatingMenu };
