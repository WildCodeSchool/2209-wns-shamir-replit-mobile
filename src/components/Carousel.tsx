import React, { useContext } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { IProject } from "../interfaces/iProject";
import { AppStackParamList } from "../Navigation";
import ProjectContext from "../contexts/projectContext";
import CurrentProjectContext from "../contexts/currentProjectContext";
import { projectAPI } from "../api/projectAPI";

type CarouselProps = {
  data: IProject[];
  goNav: (nav: keyof AppStackParamList) => void;
};

function Carousell({ data, goNav }: CarouselProps) {
  const width = Dimensions.get("window").width;

  const { setCurrentProject, setProjectsShort, projectsShort } =
    useContext(ProjectContext);
  const { setCurrentProject: setCurrentProjectGood } = useContext(
    CurrentProjectContext
  );

  const handleOpenProject = async (project: IProject) => {
    setCurrentProject(project);
    addProjectShort(project);
    setCurrentProjectGood(project);
    projectAPI.addView(project.id);
    goNav("EditorScreen");
  };

  const addProjectShort = (projet: IProject) => {
    if (projectsShort.find((p) => p.id === projet.id)) return;
    setProjectsShort([...projectsShort, projet]);
  };

  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Carousel
        loop
        width={width}
        height={50}
        autoPlay={false}
        data={[...data]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOpenProject(item)}
            style={{
              borderWidth: 1,
              justifyContent: "center",
              backgroundColor: "white",
              marginRight: 5,
              width: width * 0.85,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                textAlign: "center",
                fontSize: 30,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Carousell;
