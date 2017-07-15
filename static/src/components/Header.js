import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';

export function Header(props) {
    return (
        <header>
            <AppBar
              title="Group Order"
              iconElementLeft={
                    <IconButton>
                        <ActionHome onClick={() => browserHistory.push('/')} />
                    </IconButton>
                }
              iconElementRight={
                  <FlatButton label="Create your own" onClick={() => browserHistory.push('/not-found')} />
                }
            />
        </header>
    );
}
