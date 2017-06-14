import React from 'react';
import YeomanImage from './YeomanImage';
import Crawler from './Crawler';
import './app.css';

class AppComponent extends React.Component {

  render() {
    return (
      <div className="index">
        <YeomanImage />
        <Crawler />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
