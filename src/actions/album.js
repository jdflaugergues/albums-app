import fetch from 'cross-fetch';

// Action on request albums
export const REQUEST_ALBUMS = 'REQUEST_ALBUMS';
function requestAlbums(filter) {
  return {
    type: REQUEST_ALBUMS,
    filter
  }
}

// Action on receive albums
export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
function receiveAlbums(filter, {results}) {
  return {
    type: RECEIVE_ALBUMS,
    filter,
    albums: results,
    receivedAt: Date.now()
  }
}

// Action on get the last search value
export const GET_LAST_SEARCH_VALUE = 'GET_LAST_SEARCH_VALUE';
function getLastSearchValue(lastSearchValue) {
  return {
    type: GET_LAST_SEARCH_VALUE,
    lastSearchValue,
  }
}

// Get the last search value in the local storage
function getLocaleStorageSearchValue() {
  return window.localStorage.lastSearchValue || '';
}

// Store the current search value in the local storage
function saveLastSearch(searchValue) {
  window.localStorage.lastSearchValue = searchValue;
}

// Fetch albums by an album filter
export function fetchAlbums(filter) {
  return dispatch => {
    if (filter === undefined) {
      filter = getLocaleStorageSearchValue();
    } else {
      saveLastSearch(filter);
    }
    dispatch(getLastSearchValue(filter));

    // If no filter, no need to request because of no results from itunes on empty term param
    if (!filter) {
      return;
    }

    dispatch(requestAlbums(filter));
    const term = filter.trim().replace(/\s/g, '+');
    const resourcePath = `https://itunes.apple.com/search?entity=album&attribute=artistTerm&term=${term}`;

    return fetch(resourcePath)
      .then(response => response.json())
      .then(json => dispatch(receiveAlbums(filter, json)))
  }
}