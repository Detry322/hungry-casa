import React from 'react';
import Media from 'react-media'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/placeOrder';

import moment from 'moment';

import { Link } from 'react-router';
import { orderPath } from '../routes';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';

import Subheader from 'material-ui/Subheader';

import Add from 'material-ui/svg-icons/content/add';
import Money from 'material-ui/svg-icons/editor/attach-money';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { CountdownTimer } from './CountdownTimer';
import { RestaurantInfo } from './RestaurantInfo';
import { EditableOrderList } from './EditableOrderList';

function mapStateToProps(state) {
    return {
        orderMeta: state.placeOrder.orderMeta,
        isLoading: state.placeOrder.isLoading,
        isSaving: state.placeOrder.isSaving,
        saveSequenceNumber: state.placeOrder.saveSequenceNumber,
        error: state.placeOrder.error,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export class PlaceOrder extends React.Component {
  static propTypes = {
    orderMeta: React.PropTypes.any,
    error: React.PropTypes.any,
    isLoading: React.PropTypes.bool,
    isSaving: React.PropTypes.bool,
    placeOrderLoad: React.PropTypes.func,
    placeOrderSave: React.PropTypes.func,
    saveSequenceNumber: React.PropTypes.any,
    params: React.PropTypes.any,
  };

  _emptyOrder() {
    return {
      name: "Jack",
      venmo: "Jack",
      subtotal: 0.0,
      items: []
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      editable: true,
      saveSequenceNumber: 0,
      order: this._emptyOrder()
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.props.orderMeta) {
        var editable = moment().isBefore(moment(this.props.orderMeta.closes_at));
      }
      if (editable != this.state.editable) {
        this.setState({
          editable
        })
      }
      if (this.props.saveSequenceNumber != this.state.saveSequenceNumber && !this.props.isSaving) {
        this.props.placeOrderSave(this.state.saveSequenceNumber)
      }
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillMount() {
    if (!this.props.isLoading && !this.props.error && (!this.props.orderMeta || this.props.orderMeta.id != this.props.params.splat)) {
      this.props.placeOrderLoad(this.props.params.splat);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderMeta && (!this.props.orderMeta || this.props.orderMeta.id != nextProps.orderMeta.id)) {
      if (nextProps.orderMeta.order) {
        this.setState({
          order: nextProps.orderMeta.order
        })
      } else {
        this.setState({
          order: this._emptyOrder()
        })
      }
    }
  }

  _shouldDisplayLoading() {
    return this.props.isLoading;
  }

  _shouldDisplayError() {
    return !this.props.isLoading && this.props.error;
  }

  _shouldDisplay() {
    return !this.props.isLoading && !this.props.error && this.props.orderMeta;
  }

  _handleOrderChange(newOrder) {
    this.setState({
      saveSequenceNumber: this.state.saveSequenceNumber + 1,
      order: newOrder
    })
  }

  _orderSaveText() {
    if (this.props.saveSequenceNumber == this.state.saveSequenceNumber) {
      return "Order saved."
    } else {
      if (this.props.isSaving) {
        return "Saving order..."
      } else {
        return "We had some trouble saving your order. Will keep trying..."
      }
    }
  }

  _shouldDisplayOrder() {
    return this.state.order.name && this.state.order.venmo
  }

  _handleNameChange(newName) {
    var newOrder = Object.assign({}, this.state.order, { name: newName });
    if (this.state.saveSequenceNumber != 0 || this.state.order.items.length != 0) {
      this._handleOrderChange(newOrder)
    } else {
      this.setState({
        order: newOrder
      });
    }
  }

  _handleVenmoChange(newVenmo) {
    var newOrder = Object.assign({}, this.state.order, { venmo: newVenmo });
    if (this.state.saveSequenceNumber != 0 || this.state.order.items.length != 0) {
      this._handleOrderChange(newOrder)
    } else {
      this.setState({
        order: newOrder
      });
    }
  }

  render() {
    return (
        <section>
          <Card>
            {this._shouldDisplayLoading() && (
              <CardText>
                <LinearProgress mode="indeterminate" />
              </CardText>
            )}
            {this._shouldDisplayError() && (
              <div>
                <CardTitle title="Something went wrong." />
                <CardText>
                  Unfortunately, we were unable to load this order.
                </CardText>
                <CardText>
                  Error text: <br />
                  {this.props.error.toString()}
                </CardText>
                <CardText>
                  <RaisedButton label="Try again" fullWidth={true} onClick={() => this.props.loadOrder(this.props.params.splat)} />
                </CardText>
              </div>
            )}
            {this._shouldDisplay() && (
              <div>
                <CardTitle title={this.props.orderMeta.description} subtitle={"Order from " + this.props.orderMeta.restaurant_info.name} />
                <CardText>
                  <CountdownTimer expiration={this.props.orderMeta.closes_at} />
                  <br />
                  <RestaurantInfo info={this.props.orderMeta.restaurant_info} />
                </CardText>
                <Subheader>Your details</Subheader>
                <CardText>
                  <div style={{marginTop: '-1em'}}>
                    { this._shouldDisplayOrder() ? "Great!" : "These cannot be empty." }
                  </div>
                  <TextField style={{marginTop: '-0.5em'}}
                    fullWidth
                    value={this.state.order.name}
                    disabled={!this.state.editable}
                    floatingLabelText="Your name"
                    hintText="e.g. Joe Schmoe"
                    onChange={(e, value) => this._handleNameChange(value)} />
                  <TextField
                    style={{marginTop: '-1em'}}
                    fullWidth
                    value={this.state.order.venmo}
                    disabled={!this.state.editable}
                    floatingLabelText="Your Venmo username"
                    hintText="e.g. Joe-Schmoe (no @ symbol, please)"
                    onChange={(e, value) => this._handleVenmoChange(value)} />
                </CardText>
                { this._shouldDisplayOrder() && (
                  <div>
                    <Subheader>Your order</Subheader>
                    <CardText>
                      <EditableOrderList
                        order={this.state.order}
                        menu={this.props.orderMeta.menu}
                        changeOrder={(newOrder) => this._handleOrderChange(newOrder)}
                        editable={this.state.editable} />
                      <br />
                      <div>
                      { this._orderSaveText() }
                      </div>
                    </CardText>
                  </div>
                )}
              </div>
            )}
          </Card>
        </section>
    );
  }
}
