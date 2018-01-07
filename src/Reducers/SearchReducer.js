import { GET_SEARCH } from '../Actions/SearchActions';

export default function (state="", action) {
  //why no action dispatched??
  console.log(action);
  switch(action.type) {
    case GET_SEARCH:
      return action.payload;
    default:
      return state;
  }
}
