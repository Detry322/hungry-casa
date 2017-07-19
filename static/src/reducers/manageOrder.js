import {
    LOAD_ORDER_REQUEST,
    LOAD_ORDER_SUCCESS,
    LOAD_ORDER_FAILURE,
    REFRESH_ORDER_REQUEST,
} from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    order: null,
    isLoading: false,
    isRefreshing: false,
    error: false,
};

export default createReducer(initialState, {
    [LOAD_ORDER_REQUEST]: (state) =>
        Object.assign({}, state, {
            order: null,
            isLoading: true
        }),
    [LOAD_ORDER_SUCCESS]: (state, order) =>
        Object.assign({}, state, {
            isLoading: false,
            isRefreshing: false,
            order
        }),
    [LOAD_ORDER_FAILURE]: (state, error) =>
        Object.assign({}, state, {
            isLoading: false,
            isRefreshing: false,
            error
        }),
    [REFRESH_ORDER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isRefreshing: true
        })
});
