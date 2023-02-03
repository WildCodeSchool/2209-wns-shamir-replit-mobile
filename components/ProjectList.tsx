import React, { useState, useEffect } from "react";
import { projectAPI } from "../api/projectAPI";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
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
            <View style={{ backgroundColor: "white" }}>
              <Text>{item.name}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </>
  );
};

export { ProjectList };
