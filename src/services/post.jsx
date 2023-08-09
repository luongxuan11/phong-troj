import axiosConfig from "../axiosConfig";
import axios from "axios";

export const apiGetPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/post/all",
      });
      // console.log("check posts", response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetPostsLimit = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit`,
        params: query
      });
      // console.log("check posts", response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetNewPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/new-post`,
      });
      // console.log("check posts", response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiUploadImages = (images) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data: images
      });
      // console.log("check posts", response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiCreatePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/post/create-new`,
        data: payload
      });
      // console.log("check posts", response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });