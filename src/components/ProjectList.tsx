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

type Props = {
  data: IProject[];
  goNav: (nav: keyof AppStackParamList) => void;
};

const ProjectList = ({ data, goNav }: Props) => {
  const { setCurrentProject, setProjectsShort, projectsShort, currentProject } =
    useContext(ProjectContext);

  const handleOpenProject = async (projet: IProject) => {
    setCurrentProject(projet);
    addProjectShort(projet);
    projectAPI.addView(projet.id);
    goNav("EditorScreen");
  };

  const addProjectShort = (projet: IProject) => {
    if (projectsShort.find((p) => p.id === projet.id)) return;
    setProjectsShort([...projectsShort, projet]);
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
