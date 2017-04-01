import * as types from './actionTypes';
import Util from '../common/utils';

let fetchingClassify = () => {
    return {type: types.CLASSIFY_FETCH}
}

let receiverClassify = (classify) => {
    return {
        type: types.CLASSIFY_RECEIVER,
        classify: classify
    }
}

let receiverClassifyChild = (classifyChild) => {
    return {
        type: types.CLASSIFY_RECEIVER_CHILD,
        classifyChild: classifyChild
    }
}

export let fetchClassify = () => {
    let url = '/eihView/resources/eih/baseClassify/search?classifyLevel=1';
    console.log(url);
    return dispatch => {
        dispatch(fetchingClassify());
        Util.get(url, (response) => {
            console.log('action Classify结果');
            console.log(response);
            dispatch(receiverClassify(response));
        }, (error) => {
            alert(error);
            console.log(error);
            dispatch(receiverClassify({}));
        })
    }
}

export let fetchClassifyChild = (parentClassifyId = null) => {
    let url = '/eihView/resources/eih/baseClassify/search?classifyLevel=2' + (parentClassifyId ? '&parentClassifyId=' + parentClassifyId : '');
    console.log(url);
    return dispatch => {
        dispatch(fetchingClassify());
        Util.get(url, (response) => {
            console.log('action Classify结果');
            console.log(response);
            dispatch(receiverClassifyChild(response));
        }, (error) => {
            alert(error);
            console.log(error);
            dispatch(receiverClassifyChild({}));
        })
    }
}