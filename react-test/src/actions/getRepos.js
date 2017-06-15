import { GET_REPOS } from './const';

function action(parameter) {
  return async (dispatch) => {
    let repos = await fetch(`https://api.github.com/users/mapolin/repos`)
      .then(response => response.json())

    dispatch({
      type: GET_REPOS,
      repos: repos
    })
  }
}

module.exports = action;
