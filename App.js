import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./Router";
import { StatusBar} from "react-native";
import { Provider } from "jotai";



export default function App() {
  return (
  <Provider>
      <NavigationContainer>
        <StatusBar/>
        <Router />
      </NavigationContainer>
      </Provider>
 
  );
}
