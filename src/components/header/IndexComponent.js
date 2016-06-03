'use strict';

import React from 'react';
import MoreMenu from './MoreMenuComponent';
import {md} from '../../api/maggo';
const headerImg = require('../../images/header.jpg');

require('styles/header/Index.scss');

class IndexComponent extends React.Component {
  render() {
    return (
      <header className="index-component">
        <div className="topPlace">
          <img src={headerImg} alt=""/>
        </div>
        {
          !(md.mobile()|| md.phone() || md.tablet())?
            <MoreMenu/>
            : null
        }

      </header>
    );
  }
}

IndexComponent.displayName = 'HeaderIndexComponent';

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

export default IndexComponent;
