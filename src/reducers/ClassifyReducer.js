import * as types from '../actions/actionTypes';;
const initialState = {
    classify:undefined,
    classifyChild:undefined,
    isFetching:true
}

let classifyReducer = (state = initialState,action) => {
    switch (action.type){
        case types.CLASSIFY_FETCH:
            return Object.assign({},state,{
                ...state,
                isFetching:true,
            })
        case types.CLASSIFY_RECEIVER:
            console.log(action);
            return Object.assign({},state,{
                classify:action.classify.data,
                isFetching:false
            })
        case types.CLASSIFY_RECEIVER_CHILD:
            console.log(action);
            return Object.assign({},state,{
                classifyChild:action.classifyChild.data,
                isFetching:false
            })
        default:
            return state
    }
}

export default classifyReducer