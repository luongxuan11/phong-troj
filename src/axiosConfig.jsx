import axios from "axios"

const instance = axios.create({    //cho phép bạn tạo ra một instance của axios với các cấu hình tùy chỉnh riêng =>> có node bên file md
    baseURL: process.env.REACT_APP_SEVER_URL  // Instance này được cấu hình với một đối tượng options, trong đó có một thuộc tính baseURL được thiết lập bằng process.env.REACT_APP_SEVER_URL. Thuộc tính baseURL cho biết URL cơ sở mà các yêu cầu axios sẽ được gửi đến.
})

// Trong interceptor request, có hai hàm callback:
instance.interceptors.request.use(function (config) {  // interceptors.request sẽ chặn trước khi nó gửi req lên sever
    // Làm gì đó trước khi request dược gửi đi
    // thích hợp để gán header vào đây
    let token = JSON.parse(window.localStorage.getItem('persist:auth'))?.token.slice(1, -1)
    config.headers = { //Đây là một đối tượng trong config chứa thông tin về các header của request.
      authorization: token ? `${token}` : null
    }

    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    console.log("check erro axiosConfig at row 15", error)
    return Promise.reject(error);
  });

  // Thêm một bộ đón chặn response
axios.interceptors.response.use(function (response) {
  // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
  // Làm gì đó với dữ liệu response
  // thích hợp refresh token

  
  return response;
}, function (error) {
  // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
  // Làm gì đó với lỗi response
  return Promise.reject(error);
});

export default instance
