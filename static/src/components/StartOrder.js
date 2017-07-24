import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/startOrder';

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

import { RestaurantInfo } from './RestaurantInfo';

function mapStateToProps(state) {
    return {
        restaurants: state.startOrder.restaurants,
        isLoading: state.startOrder.isLoading,
        isLoaded: state.startOrder.isLoaded,
        restaurantLoadingError: state.startOrder.restaurantLoadingError,
        createOrderError: state.startOrder.createOrderError,
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
    return this.props.isLoading;
  }

  _shouldDisplayError() {
    return !this.props.isLoading && !this.props.isLoaded;
  }

  _shouldDisplay() {
    return !this.props.isLoading && this.props.isLoaded;
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
    let closes_at = new Date(new Date()*1 + this.state.selectedTimeLimit*1000).toISOString();
    let restaurant_id = this.state.selectedRestaurant.id;
    this.props.createOrder(description, closes_at, restaurant_id);
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
                  <SelectField
                    floatingLabelText="Select a Restaurant"
                    onChange={(e, index) => this._handleSelectRestaurant(index)}
                    value={this.state.selectedRestaurant && this.state.selectedRestaurant.id}
                    errorText={!this.state.selectedRestaurant && this.state.displayValidationErrors && "Please select a restaurant."}
                    fullWidth
                  >
                    { this.props.restaurants.map((restaurant) => (
                      <MenuItem
                        key={restaurant.id}
                        value={restaurant.id}
                        primaryText={restaurant.name}/>
                    ))}
                  </SelectField>
                </ListItem>
                { this.state.selectedRestaurant && (
                  <ListItem disabled>
                    <RestaurantInfo info={this.state.selectedRestaurant} />
                  </ListItem>
                )}
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
                  <TextField
                    fullWidth
                    value={this.state.description}
                    floatingLabelText="Description (optional)"
                    hintText="e.g. Pizza order"
                    onChange={(e, value) => this.setState({description: value})}
                  />
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
