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

import { MenuSelector } from './MenuSelector'

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

export class EditableOrderList extends React.Component {
    static propTypes = {
        order: React.PropTypes.any,
        menu: React.PropTypes.any,
        changeOrder: React.PropTypes.func,
        checkEditable: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            editable: props.checkEditable()
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.props.checkEditable() != this.state.editable) {
                this.setState({
                    editable: this.props.checkEditable()
                })
            }
        }, 50);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
        if (item.choices.length == 0) {
            return (
                <ListItem
                    disabled
                    primaryText={item.name}
                    leftIcon={<MapsRestaurant/>}
                    secondaryText={"$" + item.price}/>
            );
        } else {
            return (
                <ListItem
                    primaryText={item.name}
                    leftIcon={<MapsRestaurant/>}
                    secondaryText={"$" + item.price}
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

    _handleAdd(item) {
        this.props.changeOrder(this.props.order)
    }

    _handleDelete(i) {
        if (this.props.editable) {
            this.props.changeOrder(this.props.order)
        }
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
                            { this.state.editable && (
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
