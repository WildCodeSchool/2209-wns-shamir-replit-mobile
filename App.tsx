import { IsLoggedContextProvider } from "./contexts/isLoggedContext";
import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./Navigation";

export default function App() {
  return (
    <IsLoggedContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </IsLoggedContextProvider>
  );
}
