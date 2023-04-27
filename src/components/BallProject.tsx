import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { ProjectsShort } from "../contexts/projectContext";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

type BallProjectProps = {
  item: ProjectsShort;
  width: number;
  binPosition: Animated.SharedValue<{ x: number; y: number }>;
  ballPressed: Animated.SharedValue<boolean[]>;
  itemIndex: number;
};

const BallProject = ({
  item,
  width,
  binPosition,
  ballPressed,
  itemIndex,
}: BallProjectProps) => {
  const ballSize = 55;
  const scaleBall = useSharedValue(1);

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const ballPagePosX = useSharedValue(0);
  const ballPagePosY = useSharedValue(0);
  const savedBall = useSharedValue({ x: 0, y: 0 });
  const savedBall2 = useSharedValue({ x: 0, y: 0 });

  const ballOpacity = useDerivedValue(() => {
    if (
      ballPagePosY.value > binPosition.value.y - 35 &&
      ballPagePosX.value < binPosition.value.x + 35 &&
      ballPagePosX.value > binPosition.value.x - 35
    ) {
      return withTiming(0.5);
    }
    return withTiming(1);
  });

  const isLongPressed = useSharedValue(false);
  const isPanActivated = useSharedValue(false);

  const tap = Gesture.Tap().maxDuration(299).onEnd(()=>{
    
  })

  const longPress = Gesture.LongPress()
    .minDuration(300)
    .onStart((e) => {
      console.log("longpress Event", e);
      console.log("long press activated");
      isLongPressed.value = true;
    });



  const pan = Gesture.Pan()
    .manualActivation(true)
    .onUpdate((e) => {
      ballPressed.value = [...ballPressed.value].map((_, index) =>
        index === itemIndex ? true : false
      );
      offsetX.value = e.translationX + savedBall.value.x;
      offsetY.value = e.translationY + savedBall.value.y;
      ballPagePosX.value = e.absoluteX;
      ballPagePosY.value = e.absoluteY;

      if (
        ballPagePosY.value > binPosition.value.y - 55 &&
        ballPagePosX.value < binPosition.value.x + 55 &&
        ballPagePosX.value > binPosition.value.x - 55
      ) {
        scaleBall.value = withSpring(0.8);
      } else {
        scaleBall.value = withSpring(1);
      }
    })
    .onTouchesMove((e, state) => {
      if (isLongPressed.value && !isPanActivated.value) {
        console.log("pan gesture activated");
        isPanActivated.value = true;
        state.activate();
      }
    })
    .onTouchesUp(() => {
      if (
        ballPagePosY.value > binPosition.value.y - 55 &&
        ballPagePosX.value < binPosition.value.x + 55 &&
        ballPagePosX.value > binPosition.value.x - 55
      ) {
        scaleBall.value = withSpring(0.8);
      } else {
        offsetX.value = 0;
        offsetY.value = 0;
      }
    })
    .onEnd(() => {
      savedBall.value = {
        x: offsetX.value,
        y: offsetY.value,
      };
      savedBall2.value = {
        x: ballPagePosX.value,
        y: ballPagePosY.value,
      };
    })
    .onFinalize(() => {
      ballPressed.value = [...ballPressed.value].map(() => false);
      isLongPressed.value = false;
      isPanActivated.value = false;
      if (
        ballPagePosY.value > binPosition.value.y - 55 &&
        ballPagePosX.value < binPosition.value.x + 55 &&
        ballPagePosX.value > binPosition.value.x - 55
      ) {
        offsetY.value = withDelay(300, withSpring(binPosition.value.y + 65));
      }
    });

  const composed = Gesture.Simultaneous(pan,tap, longPress);

  // ball animated style
  const ballAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(offsetX.value) },
        { translateY: withSpring(offsetY.value) },
        { scale: scaleBall.value },
      ],
      opacity: ballOpacity.value,
    };
  });

  const styles = StyleSheet.create({
    card: {
      marginTop: 10,
      backgroundColor: "white",
      borderRadius: 10,
      width: width / 2 - 20,
      zIndex: 60,
    },
    pShortContainer: {
      flexDirection: "row",
      margin: 5,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
    ball: {
      marginTop: 5,
      width: ballSize,
      height: ballSize,
      borderRadius: 55 / 2,
      backgroundColor: "blue",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 51,
    },
    pName: {
      color: "black",
      fontSize: 20,
    },
  });
  return (
    <View style={styles.card} key={item.id}>
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.ball, ballAnimated]}>
          <AntDesign name="file1" size={34} color="white" />
        </Animated.View>
      </GestureDetector>
      <TouchableOpacity style={styles.pShortContainer}>
        <Text numberOfLines={1} style={styles.pName}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export { BallProject };
