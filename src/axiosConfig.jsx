import axios from "axios"

const instance = axios.create({    //cho phép bạn tạo ra một instance của axios với các cấu hình tùy chỉnh riêng =>> có node bên file md
    baseURL: process.env.REACT_APP_SEVER_URL  // Instance này được cấu hình với một đối tượng options, trong đó có một thuộc tính baseURL được thiết lập bằng process.env.REACT_APP_SEVER_URL. Thuộc tính baseURL cho biết URL cơ sở mà các yêu cầu axios sẽ được gửi đến.
})


instance.interceptors.request.use(function (config) {  // interceptors.request sẽ chặn trước khi nó gửi req lên sever
    // Làm gì đó trước khi request dược gửi đi
    const token = localStorage.getItem('persist:auth') // get localStorate 
    console.log(">> check token axiosCofnig at row 11.." + token)
    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    console.log("check erro axiosConfig at row 15", error)
    return Promise.reject(error);
  });

export default instance
