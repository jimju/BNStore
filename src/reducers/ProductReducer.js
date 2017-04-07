import * as types from '../actions/actionTypes';
import {combineReducers} from 'redux';
const initialState = {
    product: undefined,
    productSearch: undefined,
    productDetail: undefined,
    isFetching: false
}

let productReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCT_FETCH:
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
            })
        case types.PRODUCT_RECEIVER:
            // //console.log(action);
            return Object.assign({}, state, {
                product: action.product.data,
                isFetching: false
            })
        case types.PRODUCT_RECEIVER_MORE:
            action.product.data.data = state.product.data.concat(action.product.data.data);
            return Object.assign({}, state, {
                product: action.product.data,
                isFetching: false
            })
        case types.PRODUCT_RECEIVER_SEARCH:
            if (action.productSearch && state.productSearch)
            action.productSearch.data.data = state.productSearch.data.concat(action.productSearch.data.data);
            return Object.assign({}, state, {
                productSearch: action.productSearch.data,
                isFetching: false
            })
        case types.PRODUCT_RECEIVER_DETAIL:
            return Object.assign({}, state, {
                productDetail: action.productDetail.data,
            })
        case types.PRODUCT_SEARCH_CLEAR:
            return Object.assign({}, state, {
                productSearch: undefined,
                isFetching: false
            })
        default:
            return state
    }
}


export default productReducer