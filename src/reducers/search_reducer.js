import { GET_SEARCH } from '../actions/search_actions';

export default function (state="", action) {
  switch(action.type) {
    case GET_SEARCH:
      return action.payload;
    default:
      return state;
  }
}
