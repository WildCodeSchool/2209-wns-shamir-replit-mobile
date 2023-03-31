import { StyleSheet } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const DragBall = () => {
  const startingPosition = 100;

  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(offset.value.x) },
        { translateY: withSpring(offset.value.y) },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? "purple" : "blue",
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      console.log("onBegin");
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX,
        y: e.translationY,
      };
    })
    .onTouchesUp(() => {
      console.log("onTouchesUp");
      offset.value = {
        x: 0,
        y: 0,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
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
    zIndex: 1,
  },
});

// Btn projet ouvert
// Click sur le btn projet ouvert = ouvre la liste des projets
// Click sur un projet = ouvre le projet
// Click sur le btn projet ouvert = ferme la liste des projets
// Maintenir
