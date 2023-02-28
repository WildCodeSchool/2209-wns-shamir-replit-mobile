import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { IProject } from "../interfaces/iProject";

type Props = {
  data: IProject[];
};

const ProjectList = ({ data }: Props) => {
  useEffect(() => {
    console.log("projectList", data);
  }, []);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableHighlight key={item.id}>
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
