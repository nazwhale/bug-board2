import { database } from '../firebase';
export const FETCH_POSTS = 'FETCH_POSTS';

export function getPosts() {
  return dispatch => {
    database.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val()
      })
    })
  }
}

export function savePost(post) {
  return dispatch => database.push(post)
}

export function deletePost(id) {
  return dispatch => database.child(id).remove();
}

export function setCompleted(id) {
  var updates = {};
    updates[id + '/completed/'] = true;
  return dispatch => database.update(updates);
}

export function setIncomplete(id) {
  var updates = {};
    updates[id + '/completed/'] = false;
  return dispatch => database.update(updates);
}

export function upvote(id, currentVotes) {
  var updates = {};
    var newVotes = currentVotes + 1
    updates[id + '/votes/'] = newVotes;
  return dispatch => database.update(updates);
}
