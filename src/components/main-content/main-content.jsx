import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';

import {SearchBar} from '../search-bar';
import {AlbumsSearchGrid} from '../album';

const mainContainerStyle = cxs({
  paddingLeft: '220px',
  width: '100%',
  '@media screen and (max-width: 480px)': {
    paddingLeft: '0px',
  }
});

// Component which contains the content of the application outside navbar.
class MainContent extends Component {

  render() {
    const {
      lastSearchValue,
      handleChangeSearchValue,
      gridItems,
      gridTitle,
      favoriteAlbums,
      emptyResult,
      ...parentProps} = this.props;

    return (
      <div className={mainContainerStyle}>
        <SearchBar onChange={handleChangeSearchValue} searchValue={lastSearchValue}/>
        {gridItems.length > 0 ? <AlbumsSearchGrid
          favoriteAlbums={favoriteAlbums}
          gridItems={gridItems}
          gridTitle={gridTitle}
          {...parentProps}
        /> : emptyResult}
      </div>
    );
  }
}

MainContent.propTypes = {
  gridTitle: PropTypes.string.isRequired,
  gridItems: PropTypes.array.isRequired,
  handleChangeSearchValue: PropTypes.func.isRequired,
  lastSearchValue: PropTypes.string,
  albums: PropTypes.object.isRequired,
  favoriteAlbums: PropTypes.object
};

export default MainContent;
