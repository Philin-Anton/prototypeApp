'use strict';

import React from 'react';

require('styles/header/Title.scss');

class TitleComponent extends React.Component {
  render() {
    return (
      <div className="title-component">
        Please edit src/components/header//TitleComponent.js to update this component!
      </div>
    );
  }
}

TitleComponent.displayName = 'HeaderTitleComponent';

// Uncomment properties you need
// TitleComponent.propTypes = {};
// TitleComponent.defaultProps = {};

export default TitleComponent;
