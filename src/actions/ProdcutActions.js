import * as types from './actionTypes';
import Util from '../common/utils';


let fetchingProduct = () => {
    return {type:types.PRODUCT_FETCH}
}

let receiverProduct= (product) => {
    return {
        type:types.PRODUCT_RECEIVER,
        product:product
    }
}
export let fetchProduct = () => {
    let url = '/think/product/productList';
    console.log(url);
    return dispatch => {
        console.log('action product进入请求');
        dispatch(fetchingProduct());
        Util.get(url, (response) => {
            console.log('action product结果');
            console.log(response);
            dispatch(receiverProduct(response));
        }, (error) => {
            alert(error);
            console.log(error);
            dispatch(receiverProduct({}));
        })
    }
}

