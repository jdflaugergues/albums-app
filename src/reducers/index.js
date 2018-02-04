import {combineReducers} from 'redux'

import * as albumReducer from './album';
import * as favoriteAlbumReducer from './favorite-album';

export default combineReducers({
  ...albumReducer,
  ...favoriteAlbumReducer
});
