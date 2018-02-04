import fetch from 'cross-fetch';
import _ from 'lodash';

// Action to add an new album in favorites
export const ADD_FAVORITE = 'ADD_FAVORITE';
function addFavorite(album) {
  return {
    type: ADD_FAVORITE,
    album
  }
}

// Action to remove album from favorites
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
function removeFavorite(album) {
  return {
    type: REMOVE_FAVORITE,
    album
  }
}

// Action to receive the list of favorite albums
export const RECEIVE_FAVORITE_ALBUMS = 'RECEIVE_FAVORITE_ALBUMS';
function receiveFavoriteAlbums({results}) {
  return {
    type: RECEIVE_FAVORITE_ALBUMS,
    albums: results
  }
}

// Action to get the last favorite albums filter
export const GET_LAST_FAVORITE_SEARCH_VALUE = 'GET_LAST_FAVORITE_SEARCH_VALUE';
function getLastFavoriteSearchValue(lastSearchValue) {
  return {
    type: GET_LAST_FAVORITE_SEARCH_VALUE,
    lastSearchValue,
  }
}

// Search an album from favorite Albums by artist
export const FIND_FAVORITE_ALBUMS = 'FIND_FAVORITE_ALBUMS';
export function findFavoriteAlbums(filter) {
  return dispatch => {
    dispatch(getLastFavoriteSearchValue(filter));
    dispatch({
      type: FIND_FAVORITE_ALBUMS,
      filter
    });
  };
}


// add an album to the user favorite albums list
export function addToFavorites(album) {
  return dispatch => {
    const favoriteAlbums = JSON.parse(window.localStorage.favoriteAlbums || '[]');
    const newFavoriteAlbums = _.union(favoriteAlbums, [album.collectionId]);

    window.localStorage.favoriteAlbums = JSON.stringify(newFavoriteAlbums);
    dispatch(addFavorite(album));
  }
}

// remove an album from the user favorite albums list
export function removeFromFavorites(album) {
  return dispatch => {
    const favoriteAlbums = JSON.parse(window.localStorage.favoriteAlbums || '[]');
    const newFavoriteAlbums = _.filter(favoriteAlbums, collectionId => collectionId !== album.collectionId);

    window.localStorage.favoriteAlbums = JSON.stringify(newFavoriteAlbums);
    dispatch(removeFavorite(album));
  }
}

// Get favorite albums from localStorage
export function fetchFavoriteAlbums() {
  return dispatch => {
    const favoriteAlbums = JSON.parse(window.localStorage.favoriteAlbums || '[]');

    // If no favoriteAlbums, nothing to fetch from itunes API
    if (!favoriteAlbums.length) {
      return Promise.resolve();
    }

    // Create an array of ids split into groups of 190 for not have URL to long when fetching albums.
    const chunkCollectionIds = _.chunk(favoriteAlbums, 50);

    const allPromises = chunkCollectionIds.map(chunk => {
      const collectionIds = chunk.join(',');
      const resourcePath = `https://itunes.apple.com/lookup?id=${collectionIds}`;

      return fetch(resourcePath).then(response => response.json());
    });

    // When all promises is fetched, format data before send it to action and reducer
    return Promise.all(allPromises)
      .then(responses => {
        const results = _(responses)
          .map(response => response.results)
          .flatten()
          .value();
        return {resultCount: results.length, results}
      })
      .then(json => dispatch(receiveFavoriteAlbums(json)));
  }
}
