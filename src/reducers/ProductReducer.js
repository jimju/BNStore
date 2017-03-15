import * as types from '../actions/actionTypes';
import {combineReducers} from 'redux';
const initialState = {
    product:undefined,
    isFetching:true
}

let productReducer = (state = initialState,action) => {
    switch (action.type){
        case types.PRODUCT_FETCH:
            console.log('请求product');
            return Object.assign({},state,{
                ...state,
                isFetching:true,
            })
        case types.PRODUCT_RECEIVER:
            console.log('redux接收到product');
            console.log(action);
            return Object.assign({},state,{
                product:action.product,
                isFetching:false
            })
        default:
            return state
    }
}


export default productReducer