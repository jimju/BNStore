import {combineReducers} from 'redux';
import productReducer from './ProductReducer';
import tokenReducer from './TokenReducer';
import classifyReducer from './ClassifyReducer';

export default rootReducer = combineReducers({
    productReducer,tokenReducer,classifyReducer
})
