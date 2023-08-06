import actionTypes from "./actionTypes";
import * as services from "../../services";


export const getCurrent = () => async (dispatch) => {  
    try {
    const response = await services.apiGetCurrent()
    if(response?.data.err === 0){  
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: response.data.userData  
        })
    } else{
        dispatch({ 
            type: actionTypes.GET_CURRENT,
            mess: response.data.mess,
            currentData: null
        })
        dispatch({type: actionTypes.LOGOUT})
    }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            mess: error
        })
        dispatch({type: actionTypes.LOGOUT})
    }
}