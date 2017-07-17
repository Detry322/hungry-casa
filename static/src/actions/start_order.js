import {
    FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
} from '../constants';
import { api_list_restaurants, api_create_order } from '../api';
import { browserHistory } from 'react-router';
import { orderHostPath } from '../routes';

export function fetchRestaurantsRequest() {
    return {
        type: FETCH_RESTAURANTS_REQUEST
    };
}

export function fetchRestaurantsSuccess(restaurants) {
    return {
        type: FETCH_RESTAURANTS_SUCCESS,
        payload: restaurants
    };
}

export function fetchRestaurantsFailure(error) {
    return {
        type: FETCH_RESTAURANTS_FAILURE,
        payload: error
    };
}

export function fetchRestaurants() {
    return (dispatch) => {
        dispatch(fetchRestaurantsRequest());
        api_list_restaurants()
            .then(response => response.data)
            .then(data => dispatch(fetchRestaurantsSuccess(data.restaurant_infos)))
            .catch(error => dispatch(fetchRestaurantsFailure(error)));
    }
}

export function createOrderRequest() {
    return {
        type: CREATE_ORDER_REQUEST
    };
}

export function createOrderFailure(error) {
    return {
        type: CREATE_ORDER_FAILURE,
        payload: error
    };
}

export function createOrderSuccess(order) {
    return {
        type: CREATE_ORDER_SUCCESS,
        payload: order
    }
}

export function createOrder(description, restaurant_id, expiration) {
    return (dispatch) => {
        dispatch(createOrderRequest());
        api_create_order(description, restaurant_id, expiration)
            .then(response => response.data)
            .then(order => {
                browserHistory.push(orderHostPath(order.id));
                dispatch(createOrderSuccess(order));
            })
            .catch(error => dispatch(createOrderFailure(error)));
    }
}
