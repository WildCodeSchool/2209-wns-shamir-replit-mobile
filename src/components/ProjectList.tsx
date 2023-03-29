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
  const { setProject } = useContext(ProjectContext);

  const handleOpenProject = async (project: IProject) => {
    console.log("project", project);
    setProject(project);
    projectAPI.addView(project.id);
    goNav("EditorScreen");
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableHighlight
            key={item.id}
            onPress={() => handleOpenProject(item)}
          >
            <View style={styles.viewBox}>
              <Text>{item.name}</Text>
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
