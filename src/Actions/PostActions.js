import { database } from '../Firebase';
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

export function savePosts() {

}

export function deletePosts() {

}
