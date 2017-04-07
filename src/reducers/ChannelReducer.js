import * as types from '../actions/actionTypes';;
const initialState = {
    shop:undefined,
    distribute:undefined,
    isFetching:true
}

let channelReducer = (state = initialState,action) => {
    switch (action.type){
        case types.DISTRIBUTE_FETCH:
            return Object.assign({},state,{
                ...state,
                isFetching:true,
            })
        case types.DISTRIBUTE_RECEIVER:
            //console.log(action);
            return Object.assign({},state,{
                distribute:action.distributer.data,
                isFetching:false
            })
        case types.SHOP_RECEIVER:
            //console.log(action);
            return Object.assign({},state,{
                shop:action.store.data,
                isFetching:false
            })
        default:
            return state
    }
}

export default channelReducer;