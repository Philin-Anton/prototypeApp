require('normalize.css');
require('styles/App.css');
import React from 'react';
import { Router, Route, IndexRoute, /*hashHistory,*/ useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

import { Provider } from 'react-redux'


import reducer from '../reducers/index';

import HomePageWidget from './HomePageComponent';
import WidgetCreatePage from './WidgetCreatePageComponent';


import WidgetsList from './widgets/WidgetsListComponent.js';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    window.console.log(this.state, 'Main.js');
    return(
      <div>
        <h2>{this.props.params.repoName}</h2>
      </div>
    )
  }
}
class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  static getContent(){
    return window.console.log('getContent')
  }

  static setContent(json, callBack){
    window.console.log(window.JSON.stringify(json) + ' setContent');

    if(typeof callBack === 'function'){
      return callBack.call(this);
    }

    return true;

  }

  render() {

    reducer.dispatch({
      type: 'ADD_WIDGET_BLOCKS'
    });

    window.console.log(reducer.getState(), 'reducer');



    return(
      <Provider store={reducer}>
        <Router history={appHistory}>
          <Route path="/" component={WidgetsList}>
          </Route>
          <Route path="/a" component={HomePageWidget}>
            <IndexRoute component={Home}/>
            <Route path="/a/create" component={WidgetCreatePage}/>
          </Route>
        </Router>
      </Provider >
    )
  }
}

AppComponent.defaultProps = {

};

export default AppComponent;
