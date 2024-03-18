import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchFail, fetchStart, loginSuccess, registerSuccess, logoutSuccess } from "../features/authSlice";
import { Alert } from "react-native";



const useAuthCalls = (navigation) => {
  const dispatch = useDispatch();
  const BASE_URL = "https://blogapp-fs-backend.vercel.app" 

  const login = async (values) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}/users/auth/login/`, values);
      dispatch(loginSuccess(data));
    
      navigation.navigate("Dashboard");
    //   console.log(data);
    } catch (error) {
    //   console.log(error.message);
      dispatch(fetchFail());
    
    }
  };

  const register = async (values) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}/users/auth/register/`, values);
      dispatch(registerSuccess(data));
      
      navigation.navigate("Dashboard");
    //   console.log(data);
    } catch (error) {
    //   console.log(error);
      dispatch(fetchFail());
      
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.post(`${BASE_URL}/users/auth/logout/`);
      dispatch(logoutSuccess());
    
      navigation.navigate("Dashboard");
    } catch (error) {
      // console.log(error.message);
      dispatch(fetchFail());
     
    }
  };

  return { login, register, logout };
};

export default useAuthCalls;