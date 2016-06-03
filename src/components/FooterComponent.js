'use strict';

import React from 'react';

require('styles//Footer.scss');

import NavBar from './navBar/ControlWidgetsComponent';

class FooterComponent extends React.Component {
  render() {
    return (
      <div className="footer-component">
        <NavBar />
      </div>
    );
  }
}

FooterComponent.displayName = 'FooterComponent';

// Uncomment properties you need
// FooterComponent.propTypes = {};
// FooterComponent.defaultProps = {};

export default FooterComponent;
