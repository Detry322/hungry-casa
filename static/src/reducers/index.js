import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import startOrder from './startOrder'
import manageOrder from './manageOrder'

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    startOrder,
    manageOrder,
});

export default rootReducer;
