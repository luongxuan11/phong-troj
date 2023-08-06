import axiosConfig from "../axiosConfig";
import axiosDefault from "axios"

export const apiProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/province/all",
      });
      // console.log("check province", response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetProvince = () => new Promise(async(resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: "https://vapi.vnappmob.com/api/province/"
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

  export const apiGetDistrict = (provinceId) => new Promise(async(resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

  export const apiGetWard = (wardId) => new Promise(async(resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/ward/${wardId}`
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })