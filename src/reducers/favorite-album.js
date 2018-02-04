import _ from 'lodash';

import {
  GET_LAST_FAVORITE_SEARCH_VALUE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  RECEIVE_FAVORITE_ALBUMS,
  FIND_FAVORITE_ALBUMS} from '../actions';

// Format a string for a research comparison to be not sensitive case and not sensitive diacritic.
function toSearchFormat(str) {
  return str.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function favoriteAlbums(state = {}, action) {

  const newState =_.merge(state, {
    items: []
  });

  switch (action.type) {

    // Get the favorite albums filter
    case GET_LAST_FAVORITE_SEARCH_VALUE:
      return {...newState, ...{
        lastSearchValue: action.lastSearchValue
      }};

    // Add album in favorite albums. If favorite albums is filtered and this album is involved by this filter,
    // we add this to the favorite albums filtered list.
    case ADD_FAVORITE:
      const newItems = _.union(newState.items, [action.album]);
      return {
        ...newState, ...{
          items: newItems,
          itemsFiltered: newState.itemsFiltered && _.filter(newItems, album =>
            toSearchFormat(album.artistName).includes(toSearchFormat(_.get(newState, 'lastSearchValue', '')))
          )
        }
      };

    // Remove a favorite album from the list. If the favorite albums filtered is involved by this one, we remove it too.
    case REMOVE_FAVORITE:
      return {
        ...newState, ...{
          items: _.filter(newState.items, album => album.collectionId !== action.album.collectionId),
          itemsFiltered: newState.itemsFiltered && _.filter(newState.itemsFiltered, album => album.collectionId !== action.album.collectionId),
        }
      };

    // Initialize favorite albums list on fetching list.
    case RECEIVE_FAVORITE_ALBUMS:
      return {
        ...newState, ...{
          items: action.albums
        }
      };

    // Filter the favorite albums list to display
    case FIND_FAVORITE_ALBUMS:
      return {
        ...newState, ...{
          itemsFiltered: _.filter(newState.items, album =>
            toSearchFormat(album.artistName).includes(toSearchFormat(action.filter))
          )
        }
      };

    default:
      return newState
  }
}

