import React, { Component } from 'react';
import PropTypes from 'prop-types'
import cxs from 'cxs';

import {colors, font} from '../../common/theme';


const searchBarStyle = cxs({
  backgroundColor: '#282828',
  padding: '32px',
  ' h4': {
    margin: '0',
    marginBottom: '7px',
    fontSize: font.standardSize
  },
  ' input': {
    fontSize: font.searchSize,
    lineHeight: '56px',
    letterSpacing: '-.005em',
    fontWeight: '600',
    color: colors.primaryColor,
    textTransform: 'none',
    caretColor: colors.activeColor,
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    border: 'none',
    userSelect: 'text',
    width: '-webkit-fill-available'
  },
  '@media screen and (max-width: 480px)': {
    padding: '4px',
    ' h4': {
      display: 'none'
    },
    ' input': {
      fontSize: font.menuSize,
      lineHeight: '0px',
      padding: '8px'
    },
  },
});


// Component of the research and favorite albums pages
export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {searchValue: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.searchValue) {
      this.setState({searchValue: nextProps.searchValue});
    }
  }

  // handle when the user enter a text in the input search bar to filter the results
  handleChange(event) {
    const searchValue = event.target.value;

    this.setState({searchValue: searchValue});
    this.props.onChange(searchValue);
  }

  render() {
    return (
      <div className={searchBarStyle}>
        <h4>Research an album by artist.</h4>
        <input
          onChange={this.handleChange}
          type='text'
          value={this.state.searchValue}
          placeholder='Start typing...'>
        </input>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string
};
