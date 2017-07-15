import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Redirect, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import configureStore from './store/configureStore';
import routes from './routes';
import './styles/app.scss';

require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack');

injectTapEventPlugin();
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <section>
                <Header />
                <div className="container" style={{ marginTop: 10, paddingBottom: 250 }}>
                    <Router history={history}>
                        {routes}
                    </Router>
                </div>
                <Footer />
            </section>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
