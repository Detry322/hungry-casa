import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import startOrder from './startOrder'
import placeOrder from './placeOrder'
import manageOrder from './manageOrder'

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    startOrder,
    placeOrder,
    manageOrder,
});

export default rootReducer;
