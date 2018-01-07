export const GET_SEARCH = 'GET_SEARCH';

export function displaySearchResults(searchTerm) {
  return {
    type: GET_SEARCH,
    payload: searchTerm
  };
}
