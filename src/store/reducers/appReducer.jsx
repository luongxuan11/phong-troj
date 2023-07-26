import actionTypes from "../actions/actionTypes";

const initState = {
    mess: '', 
    categories: [],
    prices: [],
    acreages: [],
    provinces: []
}

const appReducer = (state = initState, action) =>{
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return {
                ...state, // giải state ra
                categories: action.categories || [],
                mess: action.mess || '',
            }
            case actionTypes.GET_PRICES:
            return {
                ...state, // giải state ra
                prices: action.prices || [],
                mess: action.mess || '',
            }
            case actionTypes.GET_ACREAGES:
            return {
                ...state, // giải state ra
                acreages: action.acreages || [],
                mess: action.mess || '',
            }
            case actionTypes.GET_PROVINCES:
            return {
                ...state, // giải state ra
                provinces: action.provinces || [],
                mess: action.mess || '',
            }
    
        default:
            return state;
    }
}

export default appReducer