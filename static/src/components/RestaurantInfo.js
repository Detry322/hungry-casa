import React from 'react';

import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import Loc from 'material-ui/svg-icons/communication/location-on';
import Money from 'material-ui/svg-icons/editor/attach-money';

import BulletListItem from 'material-ui/svg-icons/editor/format-list-bulleted';

import {List, ListItem} from 'material-ui/List';

import Subheader from 'material-ui/Subheader';

import Avatar from 'material-ui/Avatar';

export class RestaurantInfo extends React.Component {
    static propTypes = {
        info: React.PropTypes.any
    };

    _address() {
        var a = this.props.info.address;
        return [a.street_address, a.locality, a.region, a.postal_code].join(', ')
    }

    render() {
        return (
            <Card>
                <CardHeader
                    actAsExpander={true}
                    showExpandableButton={true}
                    title={this.props.info.name}
                    subtitle={ this._address() }
                    avatar={ this.props.info.logo } />
                <CardText expandable={true}>
                    <List disabled={true}>
                        <Subheader>At a glance</Subheader>
                        <ListItem disabled
                            primaryText={"$" + this.props.info.order_minimum.toFixed(2) }
                            secondaryText="Order minimum"
                            leftIcon={<Money />} />
                        <ListItem disabled
                            primaryText={"$" + this.props.info.delivery_fee.toFixed(2) }
                            secondaryText="Delivery fee"
                            leftIcon={<Money />} />
                    </List>
                </CardText>
            </Card>
        );
    }
}
