import React, {Component} from 'react';
import {Chip, FormControl, Input, MenuItem, Select} from '@material-ui/core';
import {bindAll, get} from 'lodash';

class MultiSelectInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userSelectedItems: [],
    };
    bindAll(this, ['_onItemSelected', '_onSelectClosed']);
  }

  // set any pre-selected values directly into the state
  static getDerivedStateFromProps(props, state) {
    const possItems = get(props, 'existingItems');
    if (possItems && possItems.length > 0 && state.userSelectedItems.length === 0) {
      return {
        userSelectedItems: possItems
      };
    } else {
      return state;
    }
  }

  _onItemSelected(event, value) {
    const selectedValue = value.props.value;
    let selectedList = event.target.value;

    // return empty lists (forces user to select at least one)
    if (!selectedList.length) {
      return;
    }

    // if 'none' is selectedValue, deselect the rest
    if (selectedValue.id === 'no') {
      this.setState({
        userSelectedItems: [selectedValue],
      });
    } else {

      // if 'none' was previously selected, remove from current selectedList
      if (selectedList.length) {
        selectedList = selectedList.filter((selected) => selected.id !== 'no');
      }

      this.setState({
        userSelectedItems: selectedList,
      });
    }
  }

  _onSelectClosed() {
    this.props.onSelectClosed(this.state.userSelectedItems);
  }


  render() {
    return (
      <>
        <label className="card__term">{this.props.label}</label>
        <FormControl>
          <Select
            multiple
            value={this.state.userSelectedItems}
            onChange={this._onItemSelected}
            onClose={this._onSelectClosed}
            input={<Input/>}
            renderValue={(selected) => (
              <div className="chips-container">
                {selected.map((option) => (
                  <Chip key={option.id} label={option.name} className="chip"/>
                ))}
              </div>
            )}
          >
            {this.props.items.map((option) => (
              <MenuItem key={option.id} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }
}

export default MultiSelectInput;
