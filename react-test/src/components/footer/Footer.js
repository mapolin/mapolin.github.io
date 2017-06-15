import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './footer.cssmodule.scss';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props
    return (
      <div className="footer-component" styleName="footer-component">
        <p>Static react component with a prop</p>
        <p>{ title }</p>
      </div>
    )
  }
}

Footer.displayName = 'FooterFooter';
Footer.propTypes = {};
Footer.defaultProps = {};

export default cssmodules(Footer, styles);
