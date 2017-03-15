import * as types from './actionTypes';
import Util from '../common/utils';


let fetchingToken = () => {
    return {type:types.TOKEN_FETCH}
}

let receiverToken = (token) => {
    return {
        type:types.TOKEN_RECEIVER,
        token:token
    }
}
export let fetchToken = () => {
    let url = 'http://192.168.30.230:7101/eihView/resources/eih/login/token';
    //credentials: 'include'
    console.log(url);
    return dispatch => {
        console.log('token进入请求');
        dispatch(fetchingToken());
        Util.getn(url, (response) => {
            console.log(response);
            dispatch(receiverToken(response));
        }, (error) => {
            alert(error);
            console.log(error);
            dispatch(receiverToken({}));
        })
    }
}



