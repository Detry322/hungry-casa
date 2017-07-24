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

import Add from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant';
import IconButton from 'material-ui/IconButton';
import { MenuSelector } from './MenuSelector'

import Delete from 'material-ui/svg-icons/action/delete';

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

export class EditableOrderList extends React.Component {
    static propTypes = {
        order: React.PropTypes.any,
        menu: React.PropTypes.any,
        changeOrder: React.PropTypes.func,
        editable: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };
    }

    _handleOpen() {
        this.setState({
            modalOpen: true
        })
    }

    _handleClose() {
        this.setState({
            modalOpen: false
        })
    }

    _avatar() {
        var color = "#" + Math.sin(this.props.order.name.hashCode()).toString(16).substr(-6)
        return (
            <Avatar backgroundColor={color}>
                {this.props.order.name[0]}
            </Avatar>
        );
    }

    _foodItem(i, item) {
        var rightIcon = (
          <IconButton
            touch={true}
            onClick={() => this._handleDelete(i)}
            tooltip="Delete"
            tooltipPosition="bottom-left">
                
            <Delete />
          </IconButton>
        )

        if (item.choices.length == 0) {
            return (
                <ListItem
                    disabled
                    primaryText={item.name}
                    leftIcon={<MapsRestaurant/>}
                    rightIconButton={rightIcon}
                    secondaryText={"$" + item.price.toFixed(2)}/>
            );
        } else {
            return (
                <ListItem
                    disabled
                    primaryText={item.name}
                    leftIcon={<MapsRestaurant/>}
                    rightIconButton={rightIcon}
                    secondaryText={"$" + item.price.toFixed(2)}
                    initiallyOpen={true}
                    primaryTogglesNestedList={true}
                    nestedItems={item.choices.map((choice, j) => (
                        <ListItem
                            key={j}
                            disabled
                            leftIcon={<BulletListItem />}
                            primaryText={choice.selected.join(', ')}
                            secondaryText={choice.name} />
                    ))} />
            );
        }
    }

    _handleAdd(item) {
        var orderCopy = JSON.parse(JSON.stringify(this.props.order))
        orderCopy.items.push(item)
        this.props.changeOrder(orderCopy)
    }

    _handleDelete(i) {
        var orderCopy = JSON.parse(JSON.stringify(this.props.order))
        orderCopy.items = orderCopy.items.filter((x, j) => i != j)
        this.props.changeOrder(orderCopy)
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        title={this.props.order.name}
                        subtitle={ "$" + this.props.order.subtotal.toFixed(2) + " + delivery fee, tax, tip"}
                        avatar={ this._avatar() } />
                    <CardText>
                        <List disabled={true}>
                            <Subheader>Selections</Subheader>
                            { this.props.order.items.map((item, i) => (
                                <div key={i}>
                                    {this._foodItem(i, item)}
                                </div>
                            ))}
                            { this.props.editable && (
                                <ListItem
                                    primaryText="Add an item."
                                    leftIcon={ <Add /> }
                                    onClick={() => this._handleOpen()} />
                            )}
                        </List>
                    </CardText>
                </Card>
                <MenuSelector
                    menu={this.props.menu}
                    addItem={(item) => this._handleAdd(item) }
                    open={this.state.modalOpen}
                    requestClose={() => this._handleClose()} />
            </div>
        );
    }
}
