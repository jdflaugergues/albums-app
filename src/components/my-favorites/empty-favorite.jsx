import React, {Component} from 'react';
import cxs from 'cxs';

import {colors, font} from '../../common/theme';


const emptyFavoriteStyle = cxs({
  textAlign: 'center',
  ' h2': {
    paddingTop: '50px',
    fontSize: font.titleSize,
    lineHeight: '44px',
    fontWeight: '600',
    margin: '24px 0'
  },
  ' h3': {
    color: colors.secondaryColor,
    fontWeight: 'normal',
    margin: 0
  }
});

class EmptyFavorite extends Component {

  render() {
    return (
      <div className={emptyFavoriteStyle}>
        <h2>No Favorite albums</h2>
        <h3>You have not yet any favorite album</h3>
        <h3>Please go on research page to add an album to your favorite albums list</h3>
      </div>
    );
  }
}

export default EmptyFavorite;
