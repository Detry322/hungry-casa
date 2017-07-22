import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/manageOrder';

import moment from 'moment';

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
import { OrderList } from './OrderList';

function mapStateToProps(state) {
    return {
        order: state.manageOrder.order,
        isLoading: state.manageOrder.isLoading,
        isRefreshing: state.manageOrder.isRefreshing,
        error: state.manageOrder.error,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export class ManageOrder extends React.Component {
  static propTypes = {
    order: React.PropTypes.any,
    error: React.PropTypes.any,
    isLoading: React.PropTypes.bool,
    isRefreshing: React.PropTypes.bool,
    loadOrder: React.PropTypes.func,
    refreshOrder: React.PropTypes.func,
    params: React.PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      deliveryFee: 0,
      tip: 15,
      tax: 8
    }
  }

  componentWillMount() {
    if (!this.props.isLoading && !this.props.error && (!this.props.order || this.props.order.id != this.props.params.splat)) {
      this.props.loadOrder(this.props.params.splat);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.order && nextProps.order) {
      this.setState({
        deliveryFee: nextProps.order.restaurant_info.delivery_fee.toFixed(2),
        tax: nextProps.order.restaurant_info.tax.toFixed(2) })
    }
  }

  _shouldDisplayLoading() {
    return this.props.isLoading;
  }

  _shouldDisplayError() {
    return !this.props.isLoading && this.props.error;
  }

  _shouldDisplay() {
    return !this.props.isLoading && !this.props.error && this.props.order;
  }

  _total() {
    var tax = (+this.state.tax || 0)/100 + 1.0
    var tip = (+this.state.tip || 0)/100 + 1.0
    var fee = (+this.state.deliveryFee || 0)
    return (this.props.order.subtotal + fee)*tax*tip;
  }

  _calculatePrice(order) {
    return order.subtotal / this.props.order.subtotal * this._total();
  }

  _note() {
    return this.props.order.description + " - " + this.props.order.restaurant_info.name + " - We used group-order to create this order!"
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
                <CardTitle title={this.props.order.description} subtitle={"Order from " + this.props.order.restaurant_info.name} />
                <CardText>
                  <CountdownTimer expiration={this.props.order.closes_at} />
                  <br />
                  <RestaurantInfo info={this.props.order.restaurant_info} />
                  <br />
                  <Card>
                    <CardHeader
                      title={"Total: $" + this._total().toFixed(2)}
                      actAsExpander={true}
                      showExpandableButton={true} />
                    <CardText expandable={true}>
                      <List disabled>
                        <ListItem disabled
                          leftIcon={ <Money /> }
                          primaryText={"$" + this.props.order.subtotal.toFixed(2) }
                          secondaryText="Subtotal" />
                        <ListItem
                          disabled
                          leftIcon={<Add />}
                          primaryText={(
                            <TextField
                              style={{marginTop: '-1.6em'}}
                              value={this.state.deliveryFee}
                              hintText="In dollars"
                              errorText={(+this.state.deliveryFee + 1) ? "" : "Must be numeric."}
                              floatingLabelText="Delivery Fee"
                              onChange={(e, value) => this.setState({deliveryFee: value})} />
                          )} />
                        <ListItem
                          disabled
                          leftIcon={<Add />}
                          primaryText={(
                            <TextField
                              style={{marginTop: '-1.6em'}}
                              value={this.state.tax}
                              hintText="e.g. 8"
                              errorText={(+this.state.tax + 1) ? "" : "Must be numeric."}
                              floatingLabelText="Tax %"
                              onChange={(e, value) => this.setState({tax: value})} />
                          )} />
                        <ListItem
                          disabled
                          leftIcon={<Add />}
                          primaryText={(
                            <TextField
                              style={{marginTop: '-1.6em'}}
                              value={this.state.tip}
                              hintText="e.g. 15 or 20"
                              errorText={(+this.state.tip + 1) ? "" : "Must be numeric."}
                              floatingLabelText="Tip %"
                              onChange={(e, value) => this.setState({tip: value})} />
                          )} />
                        <ListItem disabled
                          leftIcon={ <Money /> }
                          primaryText={"$" + this._total().toFixed(2) }
                          secondaryText="Total" />
                      </List>
                    </CardText>
                  </Card>
                </CardText>
                <Subheader>Orders</Subheader>
                <CardText>
                  { this.props.order.orders.map((order, i) => (
                    <div key={i}>
                      <OrderList order={order} total={this._calculatePrice(order)} note={this._note()} />
                      <br />
                    </div>
                  ))}
                </CardText>
              </div>
            )}
          </Card>
        </section>
    );
  }
}
