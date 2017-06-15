import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './githubrepos.cssmodule.scss';

class GithubRepos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { repos } = this.props

    if (repos instanceof Array) {
      return (
        <div className="githubrepos-component" styleName="githubrepos-component">
          { repos.map((repo) => {
              return <div>{ repo.name }</div>
          }) }
        </div>
      );
    } else {
      return (
        <div className="githubrepos-component" styleName="githubrepos-component">
          No repos found
        </div>
      )
    }
  }
}

GithubRepos.displayName = 'GithubRepos';
GithubRepos.propTypes = {};
GithubRepos.defaultProps = {};

export default cssmodules(GithubRepos, styles);
