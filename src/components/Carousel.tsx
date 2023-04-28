import React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import filteredPersoProjects from "../screens/ProjectsScreen";
import { IProject } from "../interfaces/iProject";

type CarouselProps = {
  data: IProject[];
};

function Carousell({ data }: CarouselProps) {
  const width = Dimensions.get("window").width / 4;
  console.log("filteredPersoProjects", filteredPersoProjects);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 7}
        autoPlay={false}
        data={[...data]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export default Carousell;
