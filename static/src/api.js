import axios from 'axios';
import Promise from 'promise-polyfill'; 
import Cookies from 'js-cookie';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function user_uuid() {
    if (!Cookies.get('user_uuid')) {
        Cookies.set('user_uuid', guid())
    }
    return Cookies.get('user_uuid');
}

function delayReturn(delay, thing) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(thing);
        }, delay);
    });
}

export function api_list_restaurants() {
    return axios.get('/api/restaurants');
}

export function api_create_order(description, closes_at, restaurant_id) {
    return axios.post('/api/create_order', {
        description,
        closes_at,
        restaurant_id
    });
}

export function api_order_status(order_id) {
    return axios.get('/api/order_status/' + order_id);
}

export function api_save_order(order_id, sequenceNumber, order) {
    return axios.post('/api/save_order/' + order_id, {
        sequence_number: sequenceNumber,
        user_uuid: user_uuid(),
        order: order
    })
}

export function api_load_order(order_id) {
    return axios.get('/api/load_order/' + order_id + '/' + user_uuid());
}
