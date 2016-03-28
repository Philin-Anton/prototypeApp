require('normalize.css');
require('styles/App.css');
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

  static getContent(){

    return store.getState();
  }

  static setContent(json, callBack){
    window.console.log(window.JSON.stringify(json) + ' setContent');

    if(typeof callBack === 'function'){
      return callBack.call(this);
    }

    return true;

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
