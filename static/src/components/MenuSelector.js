import React from 'react';

import Dialog from 'material-ui/Dialog';

import FlatButton from 'material-ui/FlatButton';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

export class MenuSelector extends React.Component {
    static propTypes = {
        menu: React.PropTypes.any,
        addItem: React.PropTypes.func,
        open: React.PropTypes.bool,
        requestClose: React.PropTypes.func
    };

    _initialState() {
        return {
            selectedItem: null
        }
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
        return this.state.selectedItem
    }

    _handleSubmit() {
        this.props.addItem()
        this._handleClose()
    }

    _handleCancel() {
        if (this.state.selectedItem) {
            this.setState({
                selectedItem: null
            })
        } else {
            this._handleClose()
        }
    }

    _selectItem(item) {
        this.setState({
            selectedItem: item
        });
    }

    _renderItemSelect() {
        return (
            <div>
                <FlatButton label="hi" onClick={() => this._selectItem({})} />
            </div>
        )
    }

    _renderOptionSelect() {
        return (
            <div>
                Options go here
            </div>
        )
    }

    render() {
        const actions = [
          <FlatButton
            label={ this.state.selectedItem ? "Back" : "Cancel" }
            primary={true}
            onTouchTap={() => this._handleCancel()} />,
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
                <Stepper activeStep={ this.state.selectedItem ? 1 : 0 }>
                    <Step>
                        <StepLabel>Choose a menu item</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Choose item options</StepLabel>
                    </Step>
                </Stepper>
                { this.state.selectedItem ? this._renderOptionSelect() : this._renderItemSelect() }
            </Dialog>
        );
    }
}
