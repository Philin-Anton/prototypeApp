'use strict';

import React from 'react';
import {Link , browserHistory} from 'react-router'
import NoWidgets from '../../src/components/NoWidgetsComponent';

require('styles//HomePage.scss');

class HomePageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listWidget: []
    }

  }

  render() {
    return (
      <div className="homepage-component">
        <header className="header">
          Home Page
        </header>
        <div className="mainListWidget">
          <Link to={browserHistory.createHref('/')} activeClassName="active" onlyActiveOnIndex={true}>
            Back
          </Link>
          <Link to={browserHistory.createHref('/create')}  activeClassName="active">
            Create Widget
          </Link>
          {
            this.state.listWidget[0]
              ?
              this.state.listWidget.map(widget => (
                <li key={widget.id}>
                  <Link to={'/widget/${widget.id}'}>
                    {widget.name}
                  </Link>
                </li>
              ))
              :
              <NoWidgets/>
          }
            {this.props.children}
        </div>
      </div>
    );
  }
}

HomePageComponent.displayName = 'HomePageComponent';

// Uncomment properties you need
HomePageComponent.propTypes = {
  listWidget: React.PropTypes.array.isRequired
};
HomePageComponent.defaultProps = {
  listWidget: []
};
HomePageComponent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default HomePageComponent;
