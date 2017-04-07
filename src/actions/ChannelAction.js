import * as types from './actionTypes';
import Util from '../common/utils';


let receiverDistribute = (distributer) => {
    return {
        type: types.DISTRIBUTE_RECEIVER,
        distributer: distributer
    }
}

let receiverStore = (store) => {
    return {
        type: types.SHOP_RECEIVER,
        store: store
    }
}


export let fetchDistribute= (channelId) => {
    let url = '/eihView/resources/eih/eihBaseDistributor/search?channelId='+channelId;
    return dispatch => {

        Util.get(url, (response) => {
            dispatch(receiverDistribute(response));
        }, (error) => {
            alert(error);

            dispatch(receiverDistribute({}));
        })
    }
}

export let fetchShop = (bdrDistributorId) => {
    let url = '/eihView/resources/eih/eihBaseChannel/searchExt?bdrDistributorId=' + bdrDistributorId;
    return dispatch => {
        Util.get(url, (response) => {
            // console.log(response);
            dispatch(receiverStore(response));
        }, (error) => {
            alert(error);
            //console.log(error);
            dispatch(receiverStore({}));
        })
    }
}