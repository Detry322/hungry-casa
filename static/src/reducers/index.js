import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import start_order from './start_order'

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    auth,
    start_order,
});

export default rootReducer;
