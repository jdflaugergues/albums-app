import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {MainContent} from '../main-content';
import {EmptyFavorite} from '.';

class MyFavorites extends Component {

  constructor(props) {
    super(props);

    // No need to debounce this handle because research is on memory album lists.
    this.handleChangeSearchValue = this.handleChangeSearchValue.bind(this);
  }

  // Handle on user search
  handleChangeSearchValue(searchValue) {
    this.props.findFavoriteAlbums(searchValue); // Fetch favorite albums from criterion search
  }

  render() {
    const {favoriteAlbums} = this.props;

    return (
      <MainContent
        handleChangeSearchValue={this.handleChangeSearchValue}
        lastSearchValue={_.get(favoriteAlbums, 'lastSearchValue')}
        gridItems={favoriteAlbums.itemsFiltered || favoriteAlbums.items}
        gridTitle={'My favorite albums'}
        emptyResult={<EmptyFavorite/>}
        {...this.props}
      />
    );
  }
}

MyFavorites.propTypes = {
  favoriteAlbums: PropTypes.shape({
    items: PropTypes.array.isRequired,
    itemsFiltered: PropTypes.array
  }).isRequired
};

export default MyFavorites;
