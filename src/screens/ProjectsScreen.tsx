// Description: This screen is the main screen of the app. It contains the categories of projects and the search bar.
import { StyleSheet, Text, View, TextInput } from "react-native";
import { LayoutCategory } from "../components/LayoutCategory";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import React, { useState } from "react";

type Props = StackScreenProps<AppStackParamList, "ProjectsScreen">;

// type Category = {
//   myProject: boolean;
//   projectShare: boolean;
//   publicProject: boolean;
// };

const ProjectsScreen = ({ navigation }: Props) => {
  const [searchText, setSearchText] = useState("");

  return (
    <LayoutApp navigation={navigation}>
      <View style={styles.container}>
        <Text>ProjectsScreen</Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchText}
          placeholder="Make a search"
          value={searchText}
        ></TextInput>
        <LayoutCategory name="My projects" />
        <LayoutCategory name="Shared projects" />
        <LayoutCategory name="Public projects" />
      </View>
    </LayoutApp>
  );
};

export default ProjectsScreen;

const colorBg = "#F5FCFF";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorBg,
    flex: 1,
  },
  searchInput: {
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
});
