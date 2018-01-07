export const GET_SEARCH   = 'GET_SEARCH';

export function displaySearchResults(searchTerm) {
  //where is this being returned. how does this link with the reducer
  console.log(searchTerm)
  return {
    type: GET_SEARCH,
    payload: searchTerm
  };
}
