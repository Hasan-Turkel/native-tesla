import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { MyBlogs } from './pages/MyBlogs';

import { Login } from './pages/Login';
import { Register } from './pages/Register';

import Ionicons from '@expo/vector-icons/Ionicons'
import { Entypo } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import useAuthCalls from './hooks/useAuthCalls';
import Detail from './pages/detail';
import ToastManager from 'toastify-react-native';
import Order from './pages/order';



const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function Me() {

  const { logout } = useAuthCalls();
  return (
    <Drawer.Navigator screenOptions={{headerStyle: {
      backgroundColor: '#86ecec',
    },headerRight:()=> <Text style={{padding:5}} onPress={()=>logout()}>Sign Out</Text>}}>
      <Drawer.Screen name="My Blogs" component={MyBlogs} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
function Home() {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {
      backgroundColor: '#86ecec',
    },}}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Order" component={Order} />
  </Stack.Navigator>
  );
}

const Router = () => {

  const { user } = useSelector((state) => state.auth)

  return (
  <>
   <ToastManager />
    {user?
    <Tab.Navigator screenOptions={{tabBarStyle: {
      height: 50,
      margin:2,
      backgroundColor: '#86ecec',
  }, headerStyle: {
    backgroundColor: '#86ecec',
  }, }}>
    <Tab.Screen name="Home" component={Home} options={{headerShown:false, tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      ),}}/>
    
    
    <Tab.Screen name="Me" component={Me}  options={{headerShown:false, tabBarLabel: 'Me',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person" size={size} color={color} />
      ),}}/>
    </Tab.Navigator>
    :
    <Stack.Navigator screenOptions={{headerStyle: {
      backgroundColor: 'black',
    }, headerTintColor: '#fff',}}>
      <Stack.Screen name="Tesla" component={Dashboard} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>}
    </>

  );
};

export default Router;
