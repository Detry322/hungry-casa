/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

export default (
    <div>
        <Route exact path="/" component={Home} />
        <Route path="/*" component={NotFound} />
    </div>
);
