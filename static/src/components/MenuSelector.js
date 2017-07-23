import React from 'react';

import Dialog from 'material-ui/Dialog';

import FlatButton from 'material-ui/FlatButton';

export class MenuSelector extends React.Component {
    static propTypes = {
        menu: React.PropTypes.any,
        addItem: React.PropTypes.func,
        open: React.PropTypes.bool,
        requestClose: React.PropTypes.func
    };

    _initialState() {
        return {}
    }

    constructor(props) {
        super(props);
        this.state = this._initialState();
    }

    _handleClose() {
        this.setState(this._initialState())
        this.props.requestClose()
    }

    _canSubmit() {
        return true
    }

    _handleSubmit() {
        this.props.addItem()
        this.props.requestClose()
    }

    render() {
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={() => this._handleClose()} />,
          <FlatButton
            disabled={!this._canSubmit()}
            label="Add item"
            primary={true}
            onTouchTap={() => this._handleSubmit()} />,
        ];

        return (
            <Dialog
                title="Add an item"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={() => this._handleClose()}>
            </Dialog>
        );
    }
}
