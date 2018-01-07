import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postReducer from './post_reducer';
import searchReducer from './search_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  posts: postReducer,
  searchTerm: searchReducer
});

export default rootReducer;
