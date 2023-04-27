import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { projectAPI } from "../api/projectAPI";
import ProjectContext from "../contexts/projectContext";
import { IProject } from "../interfaces/iProject";
import { AppStackParamList } from "../Navigation";
import CurrentProjectContext from "../contexts/currentProjectContext";

type Props = {
  data: IProject[];
  goNav: (nav: keyof AppStackParamList) => void;
};

const ProjectList = ({ data, goNav }: Props) => {
  const { setCurrentProject, setProjectsShort, projectsShort } =
    useContext(ProjectContext);
  const { setCurrentProject: setCurrentProjectGood } = useContext(
    CurrentProjectContext
  );

  const handleOpenProject = async (project: IProject) => {
    setCurrentProject(project);
    addProjectShort(project.id, project.name);
    setCurrentProjectGood(project);
    projectAPI.addView(project.id);
    goNav("EditorScreen");
  };

  const addProjectShort = (id: string, name: string) => {
    if (projectsShort.find((p) => p.id === id)) return;
    setProjectsShort([...projectsShort, { id, name }]);
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableHighlight
            key={item.id}
            style={{ marginTop: 10 }}
            onPress={() => handleOpenProject(item)}
          >
            <View style={styles.viewBox}>
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </>
  );
};

const colorWhite = "white";

const styles = StyleSheet.create({
  viewBox: {
    backgroundColor: colorWhite,
  },
});

export { ProjectList };
