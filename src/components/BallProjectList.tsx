import { StyleSheet, Dimensions, View } from "react-native";

import Animated, {
  withDelay,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useContext } from "react";
import ProjectContext from "../contexts/projectContext";
import { AntDesign } from "@expo/vector-icons";
import { BallProject } from "./BallProject";
import { IProject } from "../interfaces/iProject";

const binSize = 50;
const { width, height } = Dimensions.get("window");
const headerSize = 95;

type BallProjectListProps = {
  handleOpenProject: (projet: IProject) => void;
  removeProjectShort: (projet: IProject) => void;
};

const BallProjectList = ({
  handleOpenProject,
  removeProjectShort,
}: BallProjectListProps) => {
  const { projectsShort } = useContext(ProjectContext);

  const binPosition = useSharedValue({ x: 0, y: 0 });

  const ballPressed = useSharedValue<boolean[]>(
    Array(projectsShort.length).fill(false)
  );

  const binAnimated = useAnimatedStyle(() => ({
    opacity: ballPressed.value.includes(true)
      ? withTiming(1)
      : withDelay(300, withTiming(0)),
    transform: [
      { scale: withSpring(ballPressed.value.includes(true) ? 1.3 : 1) },
      {
        translateY: ballPressed.value.includes(true)
          ? withSpring(0)
          : withDelay(300, withSpring(65)),
      },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.cardContainer}>
        {projectsShort.map((item, itemIndex) => (
          <BallProject
            item={item}
            width={width}
            binPosition={binPosition}
            ballPressed={ballPressed}
            itemIndex={itemIndex}
            key={itemIndex}
            handleOpenProject={handleOpenProject}
            removeProjectShort={removeProjectShort}
          />
        ))}
      </View>
      <Animated.View
        style={[styles.bin, binAnimated]}
        onLayout={() => {
          binPosition.value = {
            x: width / 2,
            y: height - binSize / 2,
          };
        }}
      >
        <AntDesign name="closecircle" size={binSize} color="tomato" />
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export { BallProjectList };

const styles = StyleSheet.create({
  container: {
    height: height - headerSize,
    width: width,
    marginTop: 134,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    zIndex: 50,
  },
  bin: {
    zIndex: 40,
    position: "absolute",
    alignSelf: "center",
    bottom: 15,
    borderRadius: 55 / 2,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "white",
  },
});
