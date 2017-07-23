/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import { StartOrder } from './components/StartOrder';
import { ManageOrder } from './components/ManageOrder';
import { PlaceOrder } from './components/PlaceOrder';

export const HOME_PATH = '/';
export const START_ORDER_PATH = '/start';

export function orderHostPath(order_id) {
    return '/host/' + order_id;
}

export function orderPath(order_id) {
    return '/order/' + order_id;
}

export default (
    <div>
        <Route exact path={HOME_PATH} component={Home} />
        <Route exact path={START_ORDER_PATH} component={StartOrder} />
        <Route exact path={orderHostPath('*')} component={ManageOrder} />
        <Route exact path={orderPath('*')} component={PlaceOrder} />
        <Route path="/*" component={NotFound} />
    </div>
);
