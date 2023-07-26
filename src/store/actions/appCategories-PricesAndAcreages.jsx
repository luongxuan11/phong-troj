import actionTypes from "./actionTypes";
import * as services from "../../services";


export const getCategories = () => async (dispatch) => {  // export ra file list
    try {
    const response = await services.apiGetCategories()
        // console.log("check response categories action at 08", response)
    if(response?.data.err === 0){   // sau khi từ file List gửi xuống thì check ở đây
        dispatch({  // nêú không có lỗi thì sẽ gửi lên reducer 
            type: actionTypes.GET_CATEGORIES,
            categories: response.data.categoriesData  //post này bên reducer có action để chấm tớn
        })
    } else{
        dispatch({  //err =1 thì vào đây
            type: actionTypes.GET_CATEGORIES,
            mess: response.data.mess, // bên reducer
            categories: null
        })
    }
    } catch (error) {
        
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null
        })
    }
}

// prices
export const getPrices = () => async (dispatch) => {  // export ra file list
    try {
    const response = await services.apiPrices()
        console.log("check response prices action at 36", response)


    if(response?.data.err === 0){ 
        dispatch({  // nêú không có lỗi thì sẽ gửi lên reducer 
            type: actionTypes.GET_PRICES,
            prices: response.data.pricesData  //post này bên reducer có action để chấm tớn
        })
    } else{
        dispatch({  //err =1 thì vào đây
            type: actionTypes.GET_PRICES,
            mess: response.data.mess, // bên reducer
            prices: null
        })
    }
    } catch (error) {
        
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null
        })
    }
}

// acreage
export const getAcreage = () => async (dispatch) => {  // export ra file list
    try {
    const response = await services.apiAcreages()
        console.log("check response prices action at 64", response)


    if(response?.data.err === 0){ 
        dispatch({  // nêú không có lỗi thì sẽ gửi lên reducer 
            type: actionTypes.GET_ACREAGES,
            acreages: response.data.acreageData  //post này bên reducer có action để chấm tớn
        })
    } else{
        dispatch({  //err =1 thì vào đây
            type: actionTypes.GET_ACREAGES,
            mess: response.data.mess, // bên reducer
            acreages: null
        })
    }
    } catch (error) {
        
        dispatch({
            type: actionTypes.GET_ACREAGES,
            acreages: null
        })
    }
}


// province
export const getProvince = () => async (dispatch) => {  // export ra file list
    try {
    const response = await services.apiProvince()
        // console.log("check response prices action at 64", response)


    if(response?.data.err === 0){ 
        dispatch({  // nêú không có lỗi thì sẽ gửi lên reducer 
            type: actionTypes.GET_PROVINCES,
            provinces: response.data.provinceData  //post này bên reducer có action để chấm tớn
        })
    } else{
        dispatch({  //err =1 thì vào đây
            type: actionTypes.GET_PROVINCES,
            mess: response.data.mess, // bên reducer
            provinces: null
        })
    }
    } catch (error) {
        
        dispatch({
            type: actionTypes.GET_PROVINCES,
            provinces: null,
            mess: error
        })
    }
}