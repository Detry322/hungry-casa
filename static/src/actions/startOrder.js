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
    restaurants.sort((a, b) => {
        var aup = a.name.toUpperCase()
        var bup = b.name.toUpperCase()
        if (aup < bup) return -1;
        else if (aup == bup) return 0;
        else return 1;
    })
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
            .then(data => dispatch(fetchRestaurantsSuccess(data.restaurants)))
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

export function createOrder(description, closes_at, restaurant_id) {
    return (dispatch) => {
        dispatch(createOrderRequest());
        api_create_order(description, closes_at, restaurant_id)
            .then(response => response.data)
            .then(order => {
                browserHistory.push(orderHostPath(order.id));
                dispatch(createOrderSuccess(order));
            })
            .catch(error => dispatch(createOrderFailure(error)));
    }
}
