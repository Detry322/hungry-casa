import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import startOrder from './startOrder'
import manageOrder from './manageOrder'

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    auth,
    startOrder,
    manageOrder,
});

export default rootReducer;
