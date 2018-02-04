import _ from 'lodash';

import {
  REQUEST_ALBUMS,
  RECEIVE_ALBUMS,
  GET_LAST_SEARCH_VALUE} from '../actions';

export function albums(state = {}, action) {
  const newState =_.merge(state, {
    isFetching: false,
    items: []
  });

  switch (action.type) {
    case GET_LAST_SEARCH_VALUE:
      return {...newState, ...{
        lastSearchValue: action.lastSearchValue
      }};

    case REQUEST_ALBUMS:
      return Object.assign({}, newState, {
        isFetching: true
      });

    case RECEIVE_ALBUMS:
      return Object.assign({}, newState, {
        isFetching: false,
        items: action.albums,
        lastUpdated: action.receivedAt
      });

    default:
      return newState;
  }
}
