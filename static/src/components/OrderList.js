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

import FlatButton from 'material-ui/FlatButton';

import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant';

import BulletListItem from 'material-ui/svg-icons/editor/format-list-bulleted';

import {List, ListItem} from 'material-ui/List';

import Subheader from 'material-ui/Subheader';

import Avatar from 'material-ui/Avatar';

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export class OrderList extends React.Component {
    static propTypes = {
        order: React.PropTypes.any,
        total: React.PropTypes.any,
        note: React.PropTypes.any
    };

    _avatar() {
        var color = "#" + Math.sin(this.props.order.name.hashCode()).toString(16).substr(-6)
        return (
            <Avatar backgroundColor={color}>
                {this.props.order.name[0]}
            </Avatar>
        );
    }

    _foodItem(item) {
        if (item.choices.length == 0) {
            return (
                <ListItem
                    disabled
                    primaryText={item.name}
                    leftIcon={<MapsRestaurant/>}
                    secondaryText={"$" + item.price.toFixed(2)}/>
            );
        } else {
            return (
                <ListItem
                    primaryText={item.name}
                    leftIcon={<MapsRestaurant/>}
                    secondaryText={"$" + item.price.toFixed(2)}
                    initiallyOpen={true}
                    primaryTogglesNestedList={true}
                    nestedItems={item.choices.map((choice) => (
                        <ListItem
                            disabled
                            leftIcon={<BulletListItem />}
                            primaryText={choice.selected.join(', ')}
                            secondaryText={choice.name} />
                    ))} />
            );
        }
    }

    _venmo() {
        var note = encodeURIComponent(this.props.note)
        return "https://venmo.com/" + this.props.order.venmo + "?txn=charge&amount=" + this.props.total + "&note=" + note;
    }

    render() {
        return (
            <Card>
                <CardHeader
                    actAsExpander={true}
                    showExpandableButton={true}
                    title={this.props.order.name}
                    subtitle={ "Subtotal: $" + this.props.order.subtotal.toFixed(2) + ", Total: $" + this.props.total.toFixed(2)}
                    avatar={ this._avatar() } />
                <CardText expandable={true}>
                    <List disabled={true}>
                        <Subheader>Selections</Subheader>
                        { this.props.order.items.map((item, i) => (
                            <div key={i}>
                                {this._foodItem(item)}
                            </div>
                        ))}
                    </List>
                </CardText>
                <CardActions>
                    <FlatButton
                        label="Charge"
                        target="_blank"
                        href={this._venmo()} />
                </CardActions>
            </Card>
        );
    }
}
