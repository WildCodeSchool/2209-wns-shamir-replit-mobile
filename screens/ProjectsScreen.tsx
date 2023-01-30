// Description: This screen is the main screen of the app. It contains the categories of projects and the search bar.
import { StyleSheet, Text, View, TextInput } from "react-native";
import { LayoutCategory } from "../components/LayoutCategory";
import { LayoutApp } from "../components/LayoutApp";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../Navigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
