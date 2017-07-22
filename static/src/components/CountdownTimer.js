import React from 'react';

import moment from 'moment';

 moment.relativeTimeThreshold('ss', 0);

export class CountdownTimer extends React.Component {
    static propTypes = {
        expiration: React.PropTypes.string
    };

    _isOrderClosed() {
        return moment().isAfter(moment(this.props.expiration));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.forceUpdate(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                { this._isOrderClosed() ? "Order closed." : "Order closes " + moment(this.props.expiration).fromNow() + "."}
            </div>
        );
    }
}
