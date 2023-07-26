import axiosConfig from "../axiosConfig";

export const apiPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/price/all",
      });
      console.log("check price", response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
