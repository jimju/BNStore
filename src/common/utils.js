/**
 * Created by ljunb on 16/5/27.
 */
export const HOST = 'http://192.168.30.76';
let Util = {
    /*
     * fetch简单封装
     * url: 请求的URL
     * successCallback: 请求成功回调
     * failCallback: 请求失败回调
     * 
     * */
    get: (url, successCallback, failCallback) => {
        fetch(HOST + url,{ method: 'GET'})
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                failCallback(err);
            });
    },

    getn: (url, successCallback, failCallback) => {
        fetch(url,{ method: 'GET',credentials: 'include'})
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                failCallback(err);
            });
    },
}

export default Util;