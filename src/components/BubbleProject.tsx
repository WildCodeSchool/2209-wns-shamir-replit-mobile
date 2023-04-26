import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useState, useRef, useEffect } from "react";
import { DragBall } from "./DragBall";
import { BallPositionScreen } from "../interfaces/IBubble";
import ProjectContext from "../contexts/projectContext";

// type BubbleProjectProps = {
//   pListVisible: boolean;
//   setpListVisible: (pListVisible: boolean) => void;
// };

const { width, height } = Dimensions.get("window");

const BubbleProject = () => {
  const { projectsShort, setProjectsShort } = useContext(ProjectContext);
  const [idItemPressed, setIdItemPressed] = useState<string | undefined>(
    undefined
  );
  const [ballPositionScreen, setBallPositionScreen] =
    useState<BallPositionScreen>();
  const [binPositionScreen, setBinPositionScreen] =
    useState<BallPositionScreen>();

  const updateBallPosition = (coordinates: BallPositionScreen) => {
    setBallPositionScreen(coordinates);
  };

  const binRef = useRef<View>(null);
  const getBinPosition = () => {
    binRef.current?.measure((x, y, w, h, pageX, pageY) => {
      setBinPositionScreen({ absoluteX: pageX, absoluteY: pageY });
    });
  };

  const removeProjectShort = (id: string) => {
    setProjectsShort(projectsShort.filter((p) => p.id !== id));
  };

  const detectCollision = () => {
    if (!ballPositionScreen || !binPositionScreen) return;
    const binA = {
      x: binPositionScreen.absoluteX,
      y: binPositionScreen.absoluteY - 100,
    };
    // const binB = {
    //   x: binPositionScreen.absoluteX + 100,
    //   y: binPositionScreen.absoluteY - 100,
    // };
    // const binC = {
    //   x: binPositionScreen.absoluteX,
    //   y: binPositionScreen.absoluteY,
    // };
    const binD = {
      x: binPositionScreen.absoluteX + 100,
      y: binPositionScreen.absoluteY,
    };
    if (
      ballPositionScreen.absoluteY >= binA.y &&
      ballPositionScreen.absoluteX <= binD.x &&
      ballPositionScreen.absoluteY <= binD.y &&
      ballPositionScreen.absoluteX >= binA.x
    ) {
      if (idItemPressed) {
        removeProjectShort(idItemPressed);
      }
    }
  };

  useEffect(() => {
    getBinPosition();
    detectCollision();
  }, [ballPositionScreen]);

  return (
    <View style={styles.container}>
      {projectsShort.map((item) => (
        <React.Fragment key={item.id}>
          <DragBall
            setIdItemPressed={setIdItemPressed}
            item={item}
            updateBallPosition={updateBallPosition}
          />
          <TouchableOpacity style={styles.pShortContainer}>
            <Text style={styles.pName}>{item.name}</Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
      <View
        ref={binRef}
        style={styles.bin}
        // pointerEvents="auto"
        // onMoveShouldSetResponder={() => {
        //   console.log();
        //   return true;
        // }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: "black",
    flex: 1,
    opacity: 0.8,
    position: "absolute",
    zIndex: 1,
    width,
    height,
  },
  pShortContainer: {
    paddingLeft: 20,
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
    backgroundColor: "pink",
    zIndex: 10,
  },
  pName: {
    color: "black",
    fontSize: 20,
    marginLeft: 20,
  },
  bin: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "red",
    zIndex: 1000,
    position: "absolute",
    marginLeft: 20,
    bottom: 100,
  },
});

export { BubbleProject };

// DragBall Pressed
// DragBall Moved
// DragBall Released On Bin
// Delete ProjectList
