
import { useState } from "react";
import useAxios from "./useAxios";
import { useAtomValue } from "jotai";
import { id } from "../store/store";


const useTeslaCalls = (navigation) => {
  const { axiosWithToken, axiosSimple } = useAxios();
  const currentId = useAtomValue(id)
  
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();
  const [data, setData] = useState([]);
  const [extras, setExtras] = useState([]);
  const [chosen, setChosen] = useState({model:{}, paint:{}, wheel:{}, interior:{}, extras:[], steering:[]});
  

  const getCars = async () => {
    try {
      const { data } = await axiosSimple.get("/cars");
      setData(data);
      // console.log(data);
    } catch (error) {
      setErr(error);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getExtras = async () => {
    try {
      const { data } = await axiosSimple.get("/extras");
      setExtras(data);
      // console.log(data);
    } catch (error) {
      setErr(error);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const sendOrder = async (values) => {
    try {
      const { data } = await axiosSimple.put(`/users/${currentId}`, values);

      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const getMyOrders = async () => {
    try {
      const { data } = await axiosSimple(`/users/${currentId}`);
      setData(data.userorders);
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  };
  
  const getDetailCar = async (id) => {
    try {
      const { data } = await axiosSimple(`/cars/${id}/`);
      setData(data);
      setChosen({...chosen, model:data.model[0], paint:data.paint[0], wheel:data.wheels[0], interior:data.interior[0], steering:data.steering[0]||[]})
     
      // console.log(data.id);
    } catch (error) {
      // console.log(error);
    }
  };
  

  return {
    loading,
    err,
    data,
    getCars,
    sendOrder,
    getMyOrders,
    getDetailCar,
    chosen,
    setChosen,
    getExtras,
    extras
  };
};

export default useTeslaCalls;
