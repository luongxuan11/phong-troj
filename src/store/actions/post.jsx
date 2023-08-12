import actionTypes from "./actionTypes";
import { apiGetPosts, apiGetPostsLimit, apiGetNewPosts, apiGetPostsLimitAdmin } from "../../services/post";


export const getPosts = () => async (dispatch) => {  // export ra file list
    try {
    const response = await apiGetPosts()
        // console.log("check response postAction at 06", response)


    if(response?.data.err === 0){   // sau khi từ file List gửi xuống thì check ở đây
        dispatch({  // nêú không có lỗi thì sẽ gửi lên reducer 
            type: actionTypes.GET_POST,
            posts: response.data.res  //post này bên reducer có action để chấm tớn
        })
    } else{
        dispatch({  //err =1 thì vào đây
            type: actionTypes.GET_POST,
            mess: response.data.mess // bên reducer
        })
    }
    } catch (error) {
        
        dispatch({
            type: actionTypes.GET_POST,
            posts: null
        })
    }
}

export const getPostsLimitAdmin = (query) => async (dispatch) => {  // export ra file list
    // console.log(query)
    try {
    const response = await apiGetPostsLimitAdmin(query)
        // console.log(response)
    if(response?.data.err === 0){   // sau khi từ file List gửi xuống thì check ở đây
        dispatch({  // nêú không có lỗi thì sẽ gửi lên reducer 
            type: actionTypes.GET_POST_LIMIT_ADMIN,
            posts: response.data.res.rows,  //post này bên reducer có action để chấm tớn
            count: response.data.res?.count
        })
    } else{
        dispatch({  //err =1 thì vào đây
            type: actionTypes.GET_POST_LIMIT_ADMIN,
            mess: response.data.mess, // bên reducer
            posts: null
        })
    }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST_LIMIT_ADMIN,
            posts: null
        })
    }
}


export const getPostsLimit = (query) => async (dispatch) => {  // export ra file list
    // console.log(query)
    try {
    const response = await apiGetPostsLimit(query)
        // console.log(response)
    if(response?.data.err === 0){   // sau khi từ file List gửi xuống thì check ở đây
        dispatch({  // nêú không có lỗi thì sẽ gửi lên reducer 
            type: actionTypes.GET_POST_LIMIT,
            posts: response.data.res.rows,  //post này bên reducer có action để chấm tớn
            count: response.data.res?.count
        })
    } else{
        dispatch({  //err =1 thì vào đây
            type: actionTypes.GET_POST_LIMIT,
            mess: response.data.mess // bên reducer
        })
    }
    } catch (error) {
        
        dispatch({
            type: actionTypes.GET_POST_LIMIT,
            posts: null
        })
    }
}



export const getNewPost = () => async (dispatch) => { 
    try {
    const response = await apiGetNewPosts()
    // console.log(response)
    if(response?.data.err === 0){  
        dispatch({ 
            type: actionTypes.GET_NEW_POST,
            newPost: response.data.res,  //post này bên reducer có action để chấm tớn
        })
    } else{
        dispatch({  //err =1 thì vào đây
            type: actionTypes.GET_NEW_POST,
            mess: response.data.mess, // bên reducer
            newPost: null
        })
    }
    } catch (error) {
        
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPost: null
        })
    }
}