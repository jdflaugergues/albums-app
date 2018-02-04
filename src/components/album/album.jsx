import React, {Component} from 'react';
import PropTypes from 'prop-types'
import cxs from 'cxs';
import _ from 'lodash';

import {colors, font} from '../../common/theme';

const albumStyle = cxs({
  fontSize: font.standardSize,
  textAlign: 'center',
  float: 'left',
  padding: '5px',
  width: '150px',
  height: '280px',
  margin: '10px',
});

const hoverCoverArtStyle = {
  transitionProperty: 'filter',
  transitionDuration: '.2s',
  transitionTimingFunction: 'cubic-bezier(.3,0,0,1)',
  filter: 'brightness(.3)'
};

const coverArtStyle = {
  position: 'absolute',
  width: '150px',
  height: '150px',
  backgroundSize: '100%',
  backgroundColor: '#282828',
  cursor: 'pointer',
  ':hover': hoverCoverArtStyle
};

const collectionStyle = cxs({
  position: 'relative',
  top: '57px',
  margin: '12px 0 4px 0',
  fontWeight: 600,
  maxHeight: '560px'
});

const artistStyle = cxs({
  position: 'relative',
  top: '57px',
  color: colors.secondaryColor
});

const favoriteBtnHidden = {
  zIndex : -1
};

const favoriteBtnVisible = {
  zIndex : 0
};

const favoriteBtnStyle = {
  ...favoriteBtnHidden,
  width: '150px',
  fontSize: '80px',
  top:'30px',
  position: 'relative',
  color: '#f8cc1b',
  cursor: 'pointer',
  userSelect: 'none'
};

// Component of an album of a list
export default class Album extends Component {

  constructor(props) {
    super(props);

    this.onFavoriteBtnHover = this.onFavoriteBtnHover.bind(this);
    this.onFavoriteBtnLeave = this.onFavoriteBtnLeave.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentWillMount() {
    const {isFavorite, album:{artworkUrl100}} = this.props;
    this.setState({
      favoriteBtnStyle,
      isFavorite,
      coverArtStyle: {...coverArtStyle, ...{backgroundImage: `url("${artworkUrl100}")`}}
    });
  }

  // Handle to change covert art and favorite button style on album mouse hover
  onFavoriteBtnHover(e) {
    e.preventDefault();

    this.setState({
      favoriteBtnStyle: {...favoriteBtnStyle, ...favoriteBtnVisible},
      coverArtStyle: {...this.state.coverArtStyle, ...hoverCoverArtStyle}
    });
  }

  // Handle to change covert art and favorite button style on album mouse leave
  onFavoriteBtnLeave(e) {
    e.preventDefault();

    this.setState({
      favoriteBtnStyle: {...favoriteBtnStyle, ...favoriteBtnHidden},
      coverArtStyle: _.omit(this.state.coverArtStyle, _.keys(hoverCoverArtStyle))
    });
  }

  // Favorite or unfavorite the album
  toggleFavorite(e) {
    e.preventDefault();

    const newIsFavoriteStatus = !this.state.isFavorite;

    if (newIsFavoriteStatus) {
      this.props.addToFavorites(this.props.album);
    } else {
      this.props.removeFromFavorites(this.props.album);
    }

    this.setState({isFavorite: newIsFavoriteStatus})
  }

  render() {
    const {artistName, collectionName} = this.props.album;

    return (
      <div className={albumStyle}>
        <div
          onMouseOver={this.onFavoriteBtnHover}
          onMouseLeave={this.onFavoriteBtnLeave}
          onClick={this.toggleFavorite}>
          <div className={cxs(this.state.coverArtStyle)}></div>
          <div className={cxs(this.state.favoriteBtnStyle)}>{this.state.isFavorite ? '★' : '☆'}</div>
        </div>
        <div className={collectionStyle}>{collectionName}</div>
        <div className={artistStyle}>{artistName}</div>
      </div>
    );
  }
}

Album.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    primaryGenreName: PropTypes.string,
    artworkUrl60: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }),
  isFavorite: PropTypes.bool
};