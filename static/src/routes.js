/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

export const HOME_PATH = '/';
export const START_ORDER_PATH = '/start';

export default (
    <div>
        <Route exact path={HOME_PATH} component={Home} />
        <Route path="/*" component={NotFound} />
    </div>
);
