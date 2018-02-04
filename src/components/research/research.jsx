import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import _ from 'lodash';

import {MainContent} from '../main-content';
import {EmptyResult} from '.';

class Research extends Component {

  constructor(props) {
    super(props);

    // Debounce on handleChange function to prevent fetching data on each characters typed.
    // We wait 600 ms where the user doesn't type character before fetching data.
    this.handleChangeSearchValue = debounce(this.handleChangeSearchValue.bind(this), 500)
  }

  // Handle on user search
  handleChangeSearchValue(searchValue) {
    this.props.fetchAlbums(searchValue);  // Fetch albums from criterion search
  }

  render() {
    const {albums} = this.props;
    const searchValue = _.get(albums, 'lastSearchValue');

    return (
      <MainContent
        handleChangeSearchValue={this.handleChangeSearchValue}
        lastSearchValue={searchValue}
        gridItems={albums.items}
        gridTitle={'Albums result'}
        emptyResult={<EmptyResult/>}
        {...this.props}
      />
    );
  }
}

Research.propTypes = {
  albums: PropTypes.shape({
    items: PropTypes.array.isRequired
  }).isRequired
};

export default Research;
