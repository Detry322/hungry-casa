import {
    PLACE_ORDER_LOAD_REQUEST,
    PLACE_ORDER_LOAD_SUCCESS,
    PLACE_ORDER_LOAD_FAILURE,
    PLACE_ORDER_SAVE_REQUEST,
    PLACE_ORDER_SAVE_SUCCESS,
    PLACE_ORDER_SAVE_FAILURE,
} from '../constants';
import { api_load_order, api_save_order } from '../api';

export function placeOrderLoadRequest() {
    return {
        type: PLACE_ORDER_LOAD_REQUEST
    }
}

export function placeOrderLoadSuccess(order_meta) {
    return {
        type: PLACE_ORDER_LOAD_SUCCESS,
        payload: order_meta
    }
}


export function placeOrderLoadFailure(error) {
    return {
        type: PLACE_ORDER_LOAD_FAILURE,
        payload: error
    }
}

export function placeOrderLoad(order_id) {
    return (dispatch) => {
        dispatch(placeOrderLoadRequest());
        api_load_order(order_id)
            .then(response => response.data)
            .then(order_meta => dispatch(placeOrderLoadSuccess(order_meta)))
            .catch(error => dispatch(placeOrderLoadFailure(error)));
    }
}

export function placeOrderSaveRequest() {
    return {
        type: PLACE_ORDER_SAVE_REQUEST
    }
}

export function placeOrderSaveSuccess(response) {
    return {
        type: PLACE_ORDER_SAVE_SUCCESS,
        payload: response
    }
}


export function placeOrderSaveFailure(error) {
    return {
        type: PLACE_ORDER_SAVE_FAILURE,
        payload: error
    }
}

export function placeOrderSave(order_id, sequenceNumber, order) {
    return (dispatch) => {
        dispatch(placeOrderSaveRequest());
        api_save_order(order_id, sequenceNumber, order)
            .then(response => response.data)
            .then(response => dispatch(placeOrderSaveSuccess(response)))
            .catch(error => dispatch(placeOrderSaveFailure(error)));
    }
}
