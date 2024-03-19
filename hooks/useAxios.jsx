
import axios from "axios"

const useAxios = () => {
 
   const BASE_URL = "http://192.168.1.150:3000";
// console.log(token);
  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    // headers: { Authorization: `Token ${token}` },
  })
  const axiosSimple = axios.create({
    baseURL: BASE_URL,
  })

  return { axiosWithToken, axiosSimple}
}

export default useAxios