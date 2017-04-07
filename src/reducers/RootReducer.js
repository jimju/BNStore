import {combineReducers} from 'redux';
import productReducer from './ProductReducer';
import tokenReducer from './TokenReducer';
import classifyReducer from './ClassifyReducer';
import channelReducer from './ChannelReducer';
import addressReducer from './AddressReducer';

export default rootReducer = combineReducers({
    productReducer,tokenReducer,classifyReducer,channelReducer,addressReducer
})
