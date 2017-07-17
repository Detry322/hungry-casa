import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/start_order';

import moment from 'moment';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { ListItem } from 'material-ui/List';

function mapStateToProps(state) {
    return {
        restaurants: state.start_order.restaurants,
        isLoading: state.start_order.isLoading,
        isLoaded: state.start_order.isLoaded,
        restaurantLoadingError: state.start_order.restaurantLoadingError,
        createOrderError: state.start_order.createOrderError,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export class StartOrder extends React.Component {
  static propTypes = {
    restaurants: React.PropTypes.any,
    restaurantLoadingError: React.PropTypes.any,
    isLoading: React.PropTypes.bool,
    isLoaded: React.PropTypes.bool,
    createOrderError: React.PropTypes.any,
    createOrder: React.PropTypes.func,
    fetchRestaurants: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: null,
      selectedTimeLimit: 3600,
      description: "",
      displayValidationErrors: false
    };
  }

  componentWillMount() {
    if (!this.props.isLoading && !this.props.isLoaded) {
      this.props.fetchRestaurants();
    }
  }

  _shouldDisplayLoading() {
    console.log(this.props.isLoading);
    return this.props.isLoading;
  }

  _shouldDisplayError() {
    return !this.props.isLoading && !this.props.isLoaded;
  }

  _shouldDisplay() {
    return !this.props.isLoading && this.props.isLoaded;
  }

  _autoCompleteDataSource() {
    return this.props.restaurants.map(restaurant => {
      text: restaurant.name
      value: "cool"
    });
  }

  _handleSelectRestaurant(index) {
    this.setState({
      selectedRestaurant: this.props.restaurants[index]
    });
  }

  _handleCreateOrder() {
    if (!this.state.selectedRestaurant) {
      this.setState({
        displayValidationErrors: true
      });
      return;
    }
    let description = this.state.description || ('Food order on ' + moment().format('MM/DD/YYYY'));
    let restaurant_id = this.state.selectedRestaurant.id;
    let expiration = new Date(new Date()*1 + this.state.selectedTimeLimit*1000).toISOString();
    this.props.createOrder(description, restaurant_id, expiration);
  }

  render() {
    return (
        <section>
          <Card>
            <CardTitle title="Start a new order." />
            {this._shouldDisplayLoading() && (
              <CardText>
                <LinearProgress mode="indeterminate" />
              </CardText>
            )}
            {this._shouldDisplayError() && (
              <div>
                <CardText>
                  Unfortunately, the list of restaurants failed to load. Click below to try again.
                </CardText>
                <CardText>
                  Error text: <br />
                  {this.props.restaurantLoadingError.toString()}
                </CardText>
                <CardText>
                  <RaisedButton label="Try again" fullWidth={true} onClick={() => this.props.fetchRestaurants() } />
                </CardText>
              </div>
            )}
            {this._shouldDisplay() && (
              <div>
                <ListItem disabled>
                  <TextField
                    fullWidth
                    value={this.state.description}
                    floatingLabelText="Description (optional)"
                    hintText="e.g. Pizza order"
                    onChange={(e, value) => this.setState({description: value})}
                  />
                </ListItem>
                <ListItem disabled>
                  <SelectField
                    floatingLabelText="Select a Restaurant"
                    onChange={(e, index) => this._handleSelectRestaurant(index)}
                    value={this.state.selectedRestaurant && this.state.selectedRestaurant.id}
                    errorText={!this.state.selectedRestaurant && this.state.displayValidationErrors && "Please select a restaurant."}
                    fullWidth
                  >
                    { this.props.restaurants.map((restaurant) => (
                      <MenuItem key={restaurant.id} value={restaurant.id} primaryText={restaurant.name} />
                    ))}
                  </SelectField>
                </ListItem>
                <ListItem disabled>
                  <SelectField
                    floatingLabelText="Stop accepting orders in:"
                    onChange={(e, index, selectedTimeLimit) => this.setState({
                      selectedTimeLimit
                    })}
                    value={this.state.selectedTimeLimit}
                    fullWidth
                  >
                    <MenuItem value={300} primaryText="5 minutes" />
                    <MenuItem value={600} primaryText="10 minutes" />
                    <MenuItem value={1800} primaryText="30 minutes" />
                    <MenuItem value={3600} primaryText="1 hour" />
                    <MenuItem value={7200} primaryText="2 hours" />
                    <MenuItem value={21600} primaryText="6 hours" />
                    <MenuItem value={86400} primaryText="1 day" />
                  </SelectField>
                </ListItem>
                <ListItem disabled>
                  <RaisedButton label="Create order" fullWidth onClick={() => this._handleCreateOrder()} />
                </ListItem>
                { this.props.createOrderError && (
                  <ListItem disabled>
                    There was a problem creating your order. Please try again.
                  </ListItem>
                )}
              </div>
            )}
          </Card>
        </section>
    );
  }
}
