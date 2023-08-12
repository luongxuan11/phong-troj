import actionTypes from "../actions/actionTypes";

const initState = {
  post: [],
  mess: "",
  count: 0,
  newPost: [],
  postOfCurrent: []
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POST:
    case actionTypes.GET_POST_LIMIT:
      return {
        ...state, // giải state ra
        post: action.posts || [], // có action.post thì gắn vào post k có thì bằng rỗng  // action.posts là 1 cái mảng chứ 80pt
        mess: action.mess || "",
        count: action.count || 0,
      }
    case actionTypes.GET_NEW_POST:
      return {
        ...state, // giải state ra
        mess: action.mess || "",
        newPost: action.newPost || [], 
      }
    case actionTypes.GET_POST_LIMIT_ADMIN:
      return {
        ...state,
        mess: action.mess || "",
        postOfCurrent: action.posts || []
      }

    default:
      return state;
  }
};

export default postReducer;
