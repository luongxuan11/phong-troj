import actionTypes from "./actionTypes";
import { apiRegister, apiLogin } from "../../services/auth";
export const register = (payload) => async (dispatch) => {
    try {
    const response = await apiRegister(payload)
        // console.log("check response authActions at 06", response)
        // console.log(">>>>>>>>>>>>>>>>>",response?.data.err)

    if(response?.data.err === 0){
        dispatch({  // nêú không có lỗi thì sẽ gửi lên reducer 
            type: actionTypes.REGISTER_SUCCESS,
            data: response.data.access_token
        })
    } else{
        dispatch({  //err =1 thì vào đây
            type: actionTypes.REGISTER_FAIL,
            data: response.data.mess
        })
    }

    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}

// login
export const login = (payload) => async (dispatch) => {
    try {
    const response = await apiLogin(payload)
    if(response?.data.err === 0){
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            data: response.data.access_token
        })
    } else{
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: response.data.mess
        })
    }

    } catch (error) {
        
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}


// logout
export const logout = () => ({
    type: actionTypes.LOGOUT
})