
import axios from "axios"
import { useAtomValue } from 'jotai'
import { token } from "../store/store";
import { BASE_URL } from "../envSample";

const useAxios = () => {
  const currenttoken = useAtomValue(token)
 
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