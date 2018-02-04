import React, { Component } from 'react';
import PropTypes from 'prop-types'
import cxs from 'cxs';
import _ from 'lodash';

import {font} from '../../common/theme';
import {Album} from '.';

const albumsSearchGridStyle = cxs({
  listStyle: 'none',
  padding: '50px',
  margin: '0 auto',
  '@media screen and (max-width: 480px)': {
    padding: '2px',
  }
});

const titleResultStyle = cxs({
  textAlign: 'center',
  lineHeight: '44px',
  fontWeight: '600',
  margin: '24px 0',
  '@media screen and (min-width: 480px)': {
    fontSize: font.titleSize,
  },
  '@media screen and (max-width: 480px)': {
    fontSize: font.menuSize,
    margin: '4px 0'
  }
});

export default class AlbumsSearchGrid extends Component {

  render() {
    const {gridItems, gridTitle, favoriteAlbums} = this.props;

    return (
      <div>
        <h2 className={titleResultStyle}>{gridTitle}</h2>
        <div className={albumsSearchGridStyle}>
          {gridItems && gridItems.map(album =>
            <Album
              key={album.collectionId}
              removeFromFavorites={this.props.removeFromFavorites}
              addToFavorites={this.props.addToFavorites}
              isFavorite={_.some(favoriteAlbums.items, favoriteAlbum => favoriteAlbum.collectionId === album.collectionId)}
              album={album}/>
          )}
        </div>
      </div>
    );
  }
}

AlbumsSearchGrid.propTypes = {
  gridItems: PropTypes.array.isRequired,
  gridTitle: PropTypes.string.isRequired,
  fetchAlbums: PropTypes.func.isRequired
};
