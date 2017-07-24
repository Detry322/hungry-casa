import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { browserHistory } from 'react-router';
import { START_ORDER_PATH } from '../routes';

export function Home(props) {
    return (
        <section>
            <Card>
                <CardTitle title="Get started" />
                <CardText>
                    <RaisedButton label="Start an order" fullWidth={true} onClick={() => browserHistory.push(START_ORDER_PATH)}/>
                </CardText>
            </Card>
        </section>
    );
}
