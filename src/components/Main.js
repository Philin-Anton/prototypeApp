require('styles/CustomIcons.scss');
require('styles/Main.scss');
//equire('normalize.css');
require('styles/App.scss');
import React from 'react';
import { Router, Route, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

import { Provider } from 'react-redux'


import store from '../reducers/index';

import HomeContainer from './HomeContainerComponent';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

class AppComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <Provider store={store}>
        <Router history={appHistory}>
          <Route path="/" component={HomeContainer}/>
        </Router>
      </Provider >
    )
  }
}

AppComponent.defaultProps = {

};

export default AppComponent;
