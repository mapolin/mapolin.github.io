import { GET_REPOS } from './const';

function action(parameter) {
  return (dispatch) => {
    fetch(`https://api.github.com/users/mapolin/repos`)
    .then(response => {
      dispatch({
        type: GET_REPOS,
        repos: response.json()
      })
    })
  }
}

module.exports = action;
