import axiosConfig from "../axiosConfig";

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