import { Alert } from "react-native";
import { username, id, token } from "../store/store";
import useAxios from "./useAxios";
import { useAtom } from 'jotai'


const useAuthCalls = (navigation) => {
  const { axiosWithToken, axiosSimple } = useAxios();
  const [currentuser, setCurrentUser] = useAtom(username)
  const [currentid, setCurrentId] = useAtom(id)
  const [currenttoken, setCurrentToken] = useAtom(token)


  const login = async (values) => {
   
    try {
      const  {data}  = await axiosSimple.post(`/auth/login`, values);
      // console.log(data);
      setCurrentUser(data.user.username)
      setCurrentId(data.user._id)
      setCurrentToken(data.token)
    
      navigation.goBack();
    //   console.log(data);
    } catch (error) {

   Alert.alert("Login Failed")
    
    }
  };

  const register = async (values) => {
 
    try {
      const { data } = await axiosSimple.post(`/auth/register`, values);
    
      
      setCurrentUser(data.newUser.username)
      setCurrentId(data.newUser._id)
      setCurrentToken(data.token)
    
      navigation.goBack();
    } catch (error) {
      // console.log(values);

    Alert.alert("Register Failed")
  
      
    }
  };
  const logout = async() => {

    try {
      const { data } = await axiosWithToken.post(`/auth/logout`);
      setCurrentUser("")
      setCurrentId("")
      setCurrentToken("")
    
    } catch (error) {
      // console.log(error.message);
      Alert.alert("Logout Failed")
  
     
    }
  };

  return { login, register, logout };
};

export default useAuthCalls;