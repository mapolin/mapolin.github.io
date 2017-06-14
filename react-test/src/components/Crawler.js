import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './crawler.cssmodule.scss';

class Crawler extends React.Component {

  render() {
    return (
      <div className="crawler-component" styleName="crawler-component">
        This text is inside a component. Does the crawler see it?
      </div>
    );
  }
}

Crawler.displayName = 'Crawler';
Crawler.propTypes = {};
Crawler.defaultProps = {};

export default cssmodules(Crawler, styles);
