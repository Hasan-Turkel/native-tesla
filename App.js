import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./Router";
import { Provider } from "react-redux";
import store from './app/store'
import { StatusBar} from "react-native";



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar/>
        <Router />
      </NavigationContainer>
     </Provider>
  );
}
