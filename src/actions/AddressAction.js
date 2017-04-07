import * as types from './actionTypes';
import Util from '../common/utils';


let receiverAddress = (address) => {
    return {
        type: types.ADDRESS_RECEIVER,
        address: address
    }
}
let fetchingAddress = () => {
    return {
        type: types.ADDRESS_FETCH,
    }
}


export let fetchAddress= (accountId,pageSize=20) => {
    let url = '/eihView/resources/eih/address/search?accountId='+accountId+'&pageSize='+pageSize;
    return dispatch => {

        Util.get(url, (response) => {
            // console.log(response);
            dispatch(receiverAddress(response));
        }, (error) => {
            alert(error);

            dispatch(receiverAddress({}));
        })
    }
}
