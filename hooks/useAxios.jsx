
import axios from "axios"
import { useAtomValue } from 'jotai'
import { token } from "../store/store";

const useAxios = () => {
  const currenttoken = useAtomValue(token)
 
   const BASE_URL = "http://192.168.1.150:3000";
// console.log(token);
  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Token ${currenttoken}` },
  })
  const axiosSimple = axios.create({
    baseURL: BASE_URL,
  })

  return { axiosWithToken, axiosSimple}
}

export default useAxios