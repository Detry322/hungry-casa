import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';

import { HOME_PATH, START_ORDER_PATH } from '../routes';

export function Header(props) {
    return (
        <header>
            <AppBar
              title="Hungry Casa!"
              iconElementLeft={
                    <IconButton>
                        <ActionHome onClick={() => browserHistory.push(HOME_PATH)} />
                    </IconButton>
                }
              iconElementRight={
                  <FlatButton label="Start an order" onClick={() => browserHistory.push(START_ORDER_PATH)} />
                }
            />
        </header>
    );
}
