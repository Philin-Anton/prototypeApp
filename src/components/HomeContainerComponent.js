'use strict';

import React from 'react';


import Header from './header/IndexComponent';
import WidgetsList from './widgets/WidgetsListComponent.js';

require('styles//HomeContainer.scss');

class HomeContainerComponent extends React.Component {
  render() {
    return (
      <div className="homecontainer-component">
        <Header/>
        <WidgetsList />
      </div>
    );
  }
}

HomeContainerComponent.displayName = 'HomeContainerComponent';

// Uncomment properties you need
// HomeContainerComponent.propTypes = {};
// HomeContainerComponent.defaultProps = {};

export default HomeContainerComponent;
