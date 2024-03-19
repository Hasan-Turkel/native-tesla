import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "./pages/Dashboard";
import { MyOrders } from "./pages/MyOrders";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Text } from "react-native";

import useAuthCalls from "./hooks/useAuthCalls";
import Detail from "./pages/detail";
import Order from "./pages/order";

import { username } from "./store/store";
import { useAtomValue } from "jotai";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  const { logout } = useAuthCalls();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
        headerRight: () => (
          <Text style={{ padding: 5, color: "white" }} onPress={() => logout()}>
            Sign Out
          </Text>
        ),
      }}
    >
      <Stack.Screen name="Tesla" component={Dashboard} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  );
}

const Router = () => {
  const currentuser = useAtomValue(username);

  return (
    <>
      {currentuser ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              height: 50,
              margin: 2,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="MyOrders"
            component={MyOrders}
            options={{
              tabBarLabel: "MyOrders",
              headerStyle: {
                backgroundColor: "black",
              },
              headerTintColor: "#fff",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen name="Tesla" component={Dashboard} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="MyOrders" component={MyOrders} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Router;
