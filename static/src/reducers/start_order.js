import {
    FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
} from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    restaurants: [],
    isLoaded: false,
    isLoading: false,
    restaurantLoadingError: false,
    createOrderError: false
};

export default createReducer(initialState, {
    [FETCH_RESTAURANTS_REQUEST]: (state) =>
        Object.assign({}, state, {
            isLoading: true
        }),
    [FETCH_RESTAURANTS_SUCCESS]: (state, restaurants) =>
        Object.assign({}, state, {
            isLoading: false,
            isLoaded: true,
            restaurants
        }),
    [FETCH_RESTAURANTS_FAILURE]: (state, restaurantLoadingError) =>
        Object.assign({}, state, {
            isLoading: false,
            isLoaded: false,
            restaurantLoadingError
        }),
    [CREATE_ORDER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isLoading: true
        }),
    [CREATE_ORDER_SUCCESS]: (state, order) =>
        Object.assign({}, state, {
            isLoading: false
        }),
    [CREATE_ORDER_FAILURE]: (state, createOrderError) =>
        Object.assign({}, state, {
            isLoading: false,
            createOrderError
        })
});
