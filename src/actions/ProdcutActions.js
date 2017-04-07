import * as types from './actionTypes';
import Util from '../common/utils';


let fetchingProduct = () => {
    return {type:types.PRODUCT_FETCH}
}

let fetchingProductDetail = () => {
    return {type:types.PRODUCT_FETCH}
}
let clearProduct = () => {
    return {type:types.PRODUCT_SEARCH_CLEAR}
}

let receiverProduct= (product) => {
    return {
        type:types.PRODUCT_RECEIVER,
        product:product
    }
}

let receiverProductM= (product) => {
    return {
        type:types.PRODUCT_RECEIVER_MORE,
        product:product
    }
}

let recieverProductSearch= (productSearch) => {
    return {
        type:types.PRODUCT_RECEIVER_SEARCH,
        productSearch:productSearch
    }
}
let recieverProductDetail= (productDetail) => {
    return {
        type:types.PRODUCT_RECEIVER_DETAIL,
        productDetail:productDetail
    }
}
export let fetchProduct = (page=1,size=10) => {
    let url = '/eihView/resources/eih/product/search?pageNum='+page+'&pageSize='+size;
    //console.log(url);
    return dispatch => {
        //console.log('action product进入请求');
        dispatch(fetchingProduct());
        Util.get(url, (response) => {
            //console.log('action product结果');
            //console.log(response);
            dispatch(receiverProduct(response));
        }, (error) => {
            alert(error);
            //console.log(error);
            dispatch(receiverProduct({}));
        })
    }
}

export let fetchProductM = (page=1,size=10,key=null,seagment=null) => {
    let url = '/eihView/resources/eih/product/search?pageNum='+page+'&pageSize='+size;
    url = key?url+'&key='+key:url;
    url = seagment?url+'&catSegment3='+seagment:url;
    //console.log(url);
    return dispatch => {
        //console.log('action product进入请求');
        dispatch(fetchingProduct());
        Util.get(url, (response) => {
            //console.log('action product结果');
            //console.log(response);
            dispatch(receiverProductM(response));
        }, (error) => {
            alert(error);
            //console.log(error);
            dispatch(receiverProductM({}));
        })
    }
}

export let fetchingSearch = (page=1,size=10,key=null,seagment=null) => {
    let url = '/eihView/resources/eih/product/search?pageNum='+page+'&pageSize='+size;
    url = key?url+'&key='+key:url;
    url = seagment?url+'&catSegment3='+seagment:url;
    //console.log('搜索产品：　　'+url);
    return dispatch => {
        dispatch(fetchingProduct());
        if (page == 1) dispatch(clearProduct());
        Util.get(url, (response) => {
            //console.log('action product结果');
            //console.log(response);
            dispatch(recieverProductSearch(response));
        }, (error) => {
            alert(error);
            //console.log(error);
            dispatch(recieverProductSearch({}));
        })
    }
}

export let fetchDetail = (productHeaderId) => {
    let url = '/eihView/resources/eih/product?productHeaderId='+productHeaderId;
    //console.log('产品详情：　　'+url);
    return dispatch => {
        // dispatch(fetchingProductDetail());
        Util.get(url, (response) => {
            //console.log('action product结果');
            //console.log(response);
            dispatch(recieverProductDetail(response));
        }, (error) => {
            alert(error);
            //console.log(error);
            dispatch(recieverProductDetail({}));
        })
    }
}

