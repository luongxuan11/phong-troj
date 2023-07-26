import actionTypes from "../actions/actionTypes";

const initState = {
  isLoggedIn: false, // cho biết mình đã đăng nhập chưa
  token: null,
  mess: "",
  update: false
};

const authReducer = (state = initState, action) => {
  // nhận vào 2 thứ 1 là state khởi tạo 2 là 1 hành động
  // và gán cho 1 thông qua action.type
    // console.log('action.type:', action.type);

  switch (
    action.type // action.type ở đây khi nhập thông tin và bấm đăng kí sẽ nhả ra các trường ở file actiontype
  ) {
    case actionTypes.REGISTER_SUCCESS: // trường hợp mà nhả ra giống value này thì vào đây
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        mess: ''
      };
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        mess: action.data,
        token: null,
        update: !state.update
      };
      case actionTypes.LOGOUT:
        return{
            ...state,
            isLoggedIn: false,
            token: null,
            mess: ''
        }

    default:
      return state; // không vào case nào thì nhả lại state ở trạng thái initState
  }
};

export default authReducer;