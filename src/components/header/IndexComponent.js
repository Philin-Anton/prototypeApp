'use strict';

import React from 'react';


import TagComponent from './TagComponent';
import BodyColor from './BodyColorComponent';
import ItemForSales from './ItemForSalesComponent';
import Title from './TitleComponent';


const maggoLogo = require('../../images/maggoLogo.png');

require('styles/header/Index.scss');

class IndexComponent extends React.Component {
  render() {
    return (
      <header className="index-component">

        <div className="topPlace">
          <img src={maggoLogo} alt=""/>
        </div>

        <h2>Edit Article</h2>

        <div className="header-control">
          <TagComponent />
          <BodyColor />
          <ItemForSales />
        </div>

        <Title />

      </header>
    );
  }
}

IndexComponent.displayName = 'HeaderIndexComponent';

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

export default IndexComponent;
