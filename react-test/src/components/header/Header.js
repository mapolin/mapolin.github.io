import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './header.cssmodule.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props
    return (
      <div className="header-component" styleName="header-component">
        <p>Static react component with a prop</p>
        <p>{ title }</p>
      </div>
    )
  }
}

Header.displayName = 'HeaderHeader';
Header.propTypes = {};
Header.defaultProps = {};

export default cssmodules(Header, styles);
