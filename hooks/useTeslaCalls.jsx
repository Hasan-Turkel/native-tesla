import axios from "axios";
import { useState } from "react";
import useAxios from "./useAxios";
import { useSelector } from "react-redux";

const useTeslaCalls = (navigation) => {
  const { axiosWithToken, axiosSimple } = useAxios();
  const BASE_URL = "https://blogapp-fs-backend.vercel.app";
  const { user } = useSelector((state) => state.auth);

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


 

  const sendBlog = async (values) => {
    try {
      const { data } = await axiosWithToken.post(`/api/blogs/`, values);

      navigation.navigate("Me");
      // console.log(data);
    } catch (error) {
      // console.log(error.message);
    }
  };

  const getCat = async () => {
    try {
      const { data } = await axios(`${BASE_URL}/api/categories/`);
      setData(data);
      //   console.log(data);
    } catch (error) {
      // console.log(error);
    }
  };
  const getMyBlogs = async () => {
    try {
      const { data } = await axiosWithToken(`/api/blogs?author=${user.id}`);
      setData(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  };
  const sendComment = async (values, id) => {
    try {
      const { data } = await axiosWithToken.post(
        `/api/comments/${id}/`,
        values
      );

      // console.log(data);
    } catch (error) {
      // console.log(values, id);
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
  const likeUnlike = async (id) => {
    try {
      const { data } = await axiosWithToken.post(`/api/likes/${id}/`, 1);
      // console.log(data);
      // console.log(id);
    } catch (error) {
      // console.log(error.message);
      // console.log(id);
      // console.log(token);
    }
  };

  const delBlog = async (id) => {
    try {
      const { data } = await axiosWithToken.delete(`/api/blogs/${id}/`);

      navigation.goBack();
      // console.log(data);
      // console.log(id);
    } catch (error) {
      // console.log(error.message);
      // console.log(id);
    }
  };
  const updateBlog = async (values) => {
    try {
      const { data } = await axiosWithToken.put(
        `/api/blogs/${values.id}/`,
        values
      );

      // console.log(data);
      // console.log(id);
    } catch (error) {
      // console.log(error.message);
      // console.log(id);
    }
  };

  return {
    loading,
    err,
    data,
    getCars,
    sendBlog,
    getCat,
    getMyBlogs,
    sendComment,
    getDetailCar,
    likeUnlike,
    delBlog,
    updateBlog,
    chosen,
    setChosen,
    getExtras,
    extras
  };
};

export default useTeslaCalls;
