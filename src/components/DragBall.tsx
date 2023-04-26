import { StyleSheet } from "react-native";
import { runOnJS } from "react-native-reanimated";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ProjectsShort } from "../contexts/projectContext";
import { BallPositionScreen } from "../interfaces/IBubble";

type DragBallProps = {
  setIdItemPressed: React.Dispatch<React.SetStateAction<string | undefined>>;
  item: ProjectsShort;
  updateBallPosition: (coordinates: BallPositionScreen) => void;
};

const DragBall = ({
  setIdItemPressed,
  item,
  updateBallPosition,
}: DragBallProps) => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const animatedStyles = useAnimatedStyle(() => {
    const settings = {
      transform: [
        { translateX: withSpring(offset.value.x) },
        { translateY: withSpring(offset.value.y) },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? "purple" : "blue",
    };
    return settings;
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      console.log("onBegin");
      isPressed.value = true;
      runOnJS(setIdItemPressed)(item.id);
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX,
        y: e.translationY,
      };
      runOnJS(updateBallPosition)({
        absoluteX: e.absoluteX,
        absoluteY: e.absoluteY,
      });
    })
    .onTouchesUp(() => {
      console.log("onTouchesUp");
      offset.value = {
        x: 0,
        y: 0,
      };
    })
    .onFinalize(() => {
      console.log("onFinalize");
      isPressed.value = false;
      runOnJS(setIdItemPressed)(undefined);
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.ball, animatedStyles]} />
    </GestureDetector>
  );
};

export { DragBall };

const styles = StyleSheet.create({
  ball: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: "blue",
    alignSelf: "center",
    zIndex: 1000,
  },
});

// Btn projet ouvert
// Click sur le btn projet ouvert = ouvre la liste des projets
// Click sur un projet = ouvre le projet
// Click sur le btn projet ouvert = ferme la liste des projets
// Maintenir
