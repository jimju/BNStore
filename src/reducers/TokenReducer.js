import * as types from '../actions/actionTypes';
import {combineReducers} from 'redux';
const initialState = {
    token:undefined,
    isFetchingToken:true
}

let tokenReducer = (state = initialState,action) => {
    switch (action.type){
        case types.TOKEN_FETCH:
            return Object.assign({},state,{
                ...state,
                isFetchingToken:true,
            })
        case types.TOKEN_RECEIVER:
            return Object.assign({},state,{
                token:action.token,
                isFetchingToken:false
            })
        default:
            return state
    }
}


export default tokenReducer