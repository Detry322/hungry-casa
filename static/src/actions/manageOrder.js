import {
    LOAD_ORDER_REQUEST,
    LOAD_ORDER_SUCCESS,
    LOAD_ORDER_FAILURE,
    REFRESH_ORDER_REQUEST,
} from '../constants';
import { api_order_status } from '../api';

export function loadOrderRequest() {
    return {
        type: LOAD_ORDER_REQUEST
    };
}

export function loadOrderSuccess(order) {
    return {
        type: LOAD_ORDER_SUCCESS,
        payload: order
    };
}

export function loadOrderFailure(error) {
    return {
        type: LOAD_ORDER_FAILURE,
        payload: error
    };
}

export function loadOrder(order_id) {
    return (dispatch) => {
        dispatch(loadOrderRequest());
        api_order_status(order_id)
            .then(response => response.data)
            .then(order => dispatch(loadOrderSuccess(order)))
            .catch(error => dispatch(loadOrderFailure(error)));
    }
}

export function refreshOrderRequest() {
    return {
        type: REFRESH_ORDER_REQUEST
    };
}

export function refreshOrder(order_id) {
    return (dispatch) => {
        dispatch(refreshOrderRequest());
        api_order_status(order_id)
            .then(response => response.data)
            .then(order => dispatch(loadOrderSuccess(order)))
            .catch(error => dispatch(loadOrderFailure(error)));
    }
}
