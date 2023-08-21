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
        params: query,
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
        data: images,
      });
      // console.log("check posts", response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreatePost = (payload) => new Promise(async (resolve, reject) => {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key === "images" && payload[key].length > 0) {
        for (let i = 0; i < payload[key].length; i++) {
          formData.append(key, payload[key][i]);
        }
      } else {
        formData.append(key, payload[key]);
      }
    });
    const response = await axiosConfig({
      method: "post",
      url: "/api/v1/post/create-new",
      data: formData,
      headers: {"Content-Type": "multipart/form-data"},
    });
    resolve(response);
  } catch (error) {
    reject(error);
  }
});

export const apiGetPostsLimitAdmin = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit-admin`,
        params: query, // req.query ở đây // phương thức get or delete thì sẽ truyền bằng query: params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdatePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(payload)
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
      if (key === "imageFile" && payload[key].length > 0) {
        for (let i = 0; i < payload[key].length; i++) {
          formData.append(key, payload[key][i]);
        }
      } else {
        formData.append(key, payload[key]);
      }
    });
    const response = await axiosConfig({
      method: "put",
      url: "/api/v1/post/update",
      data: formData,
      headers: {"Content-Type": "multipart/form-data"},
    });
     resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeletePost = (postId, fileName) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/post/delete`,
        params: { postId, fileName }, // nhận được 1 obj các trường để xóa
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
