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
      setCurrentUser(data.username)
      setCurrentId(data._id)
    
      navigation.goBack();
    //   console.log(data);
    } catch (error) {
    //   console.log(error.message);
    
    }
  };

  const register = async (values) => {
 
    try {
      const { data } = await axiosSimple.post(`/auth/register`, values);
    
      
      navigation.navigate("Dashboard");
    //   console.log(data);
    } catch (error) {
    //   console.log(error);
  
      
    }
  };
  const logout = async () => {

    try {
      await axiosWithToken.post(`/auth/logout`);
      
    
      navigation.navigate("Dashboard");
    } catch (error) {
      // console.log(error.message);
  
     
    }
  };

  return { login, register, logout };
};

export default useAuthCalls;