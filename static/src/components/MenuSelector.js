import React from 'react';

import Dialog from 'material-ui/Dialog';

import FlatButton from 'material-ui/FlatButton';

import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import AutoComplete from 'material-ui/AutoComplete';
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant';
import BulletListItem from 'material-ui/svg-icons/editor/format-list-bulleted';

import Checkbox from 'material-ui/Checkbox';

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
            selectedItem: null,
            searchText: ""
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
        return this.state.selectedItem && this._validSelection()
    }

    _handleSubmit() {
        var price = this.state.selectedItem.price;
        var choices = []
        this.state.selectedItem.choices.forEach((choice) => {
            var selected = []
            choice.options.forEach((option) => {
                if (option.checked) {
                    price += option.price
                    selected.push(option.name)
                }
            })
            choices.push({
                name: choice.name,
                selected
            })
        })

        var item = {
            name: this.state.selectedItem.name,
            price,
            choices
        }

        this.props.addItem(item)
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

    _searchItems() {
        var result = [];
        this.props.menu.forEach(category => {
            var category_items = [];
            category.items.forEach(item => {
                if (AutoComplete.fuzzyFilter(this.state.searchText, item.name)) {
                    category_items.push(item);
                }
            });
            if (category_items.length != 0) {
                result.push(Object.assign({}, category, {
                    items: category_items
                }))
            }
        })
        return result;
    }

    _renderItemSelect() {
        var listItems = this._searchItems()
        return (
            <div>
                <TextField style={{marginTop: '-0.5em'}}
                    fullWidth
                    value={this.state.searchText}
                    floatingLabelText="Food Search"
                    hintText="e.g. Pad Thai"
                    onChange={(e, value) => this.setState({
                        searchText: value
                    })} />
                <List>
                    { listItems.length == 0 && (
                        <Subheader>No items matched your search</Subheader>
                    )}
                    { listItems.map((category, i) => (
                        <div key={i}>
                            <Subheader>{category.name}</Subheader>
                            { category.items.map((item, j) => (
                                <ListItem
                                    key={j}
                                    leftIcon={<MapsRestaurant />}
                                    primaryText={item.name}
                                    secondaryText={item.description}
                                    rightAvatar={
                                        <div style={{marginTop: '0.75em'}}>
                                            {"$" + item.price.toFixed(2)}
                                        </div>
                                    }
                                    onClick={() => this._selectItem(item)} />
                            ))}
                        </div>
                    ))}
                </List>
            </div>
        )
    }

    _itemSuffix(count) {
        return (count == 1) ? "1 item." : (count + " items.")
    }

    _selectText(choice) {

        if (choice.min_choices == 0) {
            return (choice.max_choices == Infinity) ? "Select any items." : "Select up to " + this._itemSuffix(choice.max_choices)
        } else if (choice.min_choices == choice.max_choices) {
            return "Select " + this._itemSuffix(choice.min_choices)
        } else {
            if (choice.max_choices == Infinity) {
                return "Select at least " + this._itemSuffix(choice.min_choices)
            }
            return "Select between " + choice.min_choices + " and " + choice.max_choices + " items."
        }
    }

    _validSelection() {
        return this.state.selectedItem.choices.every(this._validChoice)
    }

    _validChoice(choice) {
        var count = 0;
        for (var i = 0; i < choice.options.length; i += 1) {
            count += !!choice.options[i].checked
        }
        return count >= choice.min_choices && count <= choice.max_choices
    }

    _toggleBox(i, j) {
        var newSelected = JSON.parse(JSON.stringify(this.state.selectedItem))
        newSelected.choices[i].options[j].checked = !newSelected.choices[i].options[j].checked;
        this.setState({
            selectedItem: newSelected
        })
    }

    _renderSingleChoice(choice, i) {
        return (
            <List key={i}>
                <Subheader>{choice.name + " - " + this._selectText(choice)}</Subheader>
                { choice.options.map((option, j) => (
                    <ListItem
                        key={j}
                        leftCheckbox={
                            <Checkbox
                                checked={option.checked}
                                onClick={() => this._toggleBox(i, j)} />
                        }
                        primaryText={option.name}
                        secondaryText={option.price && ("+ $" + option.price.toFixed(2))} />
                ))}
            </List>
        )
    }

    _renderOptionSelect() {
        return (
            <div>
                <h3>{this.state.selectedItem.name}</h3>
                <h4>{this.state.selectedItem.description}</h4>
                { this.state.selectedItem.choices.length == 0 && (
                    <Subheader>No options to display.</Subheader>
                )}
                { this.state.selectedItem.choices.map((choice, i) => (
                    this._renderSingleChoice(choice, i)
                ))}
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
                autoScrollBodyContent={true}
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
