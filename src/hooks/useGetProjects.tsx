import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { projectAPI } from "../api/projectAPI";
import ProjectListContext from "../contexts/projectListContext";

const useGetProjects = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);

  const getPersoProjects = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId != null) {
      const idUser = parseInt(userId, 10);
      const data = await projectAPI.getProjectByUserId(idUser);
      setProjectList({ ...projectList, owned: data });
    } else {
      console.error("probleme");
    }
  };

  const getPublicProjects = async () => {
    setProjectList({
      ...projectList,
      public: await projectAPI.getPublicProjects(),
    });
  };

  return { getPersoProjects, getPublicProjects };
};

export { useGetProjects };
