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
import { ListItem } from 'material-ui/List';

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
  }

  componentWillMount() {
    if (!this.props.isLoading && !this.props.error && (!this.props.order || this.props.order.id != this.props.params.splat)) {
      this.props.loadOrder(this.props.params.splat);
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
                  Cool order stuff goes here
                </CardText>
              </div>
            )}
          </Card>
        </section>
    );
  }
}
