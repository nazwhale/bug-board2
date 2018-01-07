import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postReducer from './PostReducer';
import searchReducer from './SearchReducer';

const rootReducer = combineReducers({
  form: formReducer,
  posts: postReducer,
  searchTerm: searchReducer
});

export default rootReducer;
