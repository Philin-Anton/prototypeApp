'use strict';

import React from 'react';
//import linkState from 'react-link-state';

require('styles//WidgetCreatePage.scss');

class WidgetCreatePageComponent extends React.Component {

  constructor(props) {
    super(props);
    window.console.log(props);

    this.state = {
      listWidget: [{
        name:'ZDsdas'
      }]
    }
  }

  render() {
    window.console.log(this.state, 'WidgetCreatePage');
    return (
      <div className="widgetcreatepage-component">
        Please edit src/components {/*WidgetCreatePageComponent.js to update this component!*/}
      </div>
    );
  }
}

WidgetCreatePageComponent.displayName = 'WidgetCreatePageComponent';
WidgetCreatePageComponent.propTypes = {
  listWidget: React.PropTypes.array.isRequired
};
// Uncomment properties you need
// WidgetCreatePageComponent.propTypes = {};
// WidgetCreatePageComponent.defaultProps = {};

export default WidgetCreatePageComponent;
