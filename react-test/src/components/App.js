import React from 'react';
import './app.css';

/*
  Import components
 */
import Header from 'components/header/Header'
import Footer from 'components/footer/Footer'
import GithubRepos from 'components/GithubRepos'

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { repos } = this.props

    return (
      <div className="index">
        <Header title="Header title prop" />
        <GithubRepos repos={repos.repos} />
        <Footer title="Footer text prop" />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
