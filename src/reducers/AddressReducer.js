import * as types from '../actions/actionTypes';;
const initialState = {
    address:undefined,
    isFetching:false
}

let addressReducer = (state = initialState,action) => {

    switch (action.type){
        case types.ADDRESS_FETCH:
            return Object.assign({},state,{
                ...state,
                isFetching:true,
            })
        case types.ADDRESS_RECEIVER:
            // console.log(action);
            return Object.assign({},state,{
                address:action.address.data,
                isFetching:false
            })
        default:
            return state
    }
}

export default addressReducer;