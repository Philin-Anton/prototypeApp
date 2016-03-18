'use strict';

import React from 'react';

require('styles//NoWidgets.scss');

class NoWidgetsComponent extends React.Component {
  render() {
    return (
      <div className="nowidgets-component">
        Sorry, I'm not search Widgets! =(
      </div>
    );
  }
}

NoWidgetsComponent.displayName = 'NoWidgetsComponent';

// Uncomment properties you need
// NoWidgetsComponent.propTypes = {};
// NoWidgetsComponent.defaultProps = {};

export default NoWidgetsComponent;
