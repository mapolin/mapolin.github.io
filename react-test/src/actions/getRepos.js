import { GET_REPOS } from './const';

function action(parameter) {
  return (dispatch) => {
    return fetch(`https://api.github.com/users/mapolin/repos`)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: GET_REPOS,
          repos: json
        })
      })
  }
}

module.exports = action;
