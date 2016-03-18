require('normalize.css');
require('styles/App.css');

import React from 'react';
import { Router, Route,  browserHistory } from 'react-router'


//import FileInput from '../../src/components/FileInputComponent';
import HomePageWidget from '../../src/components/HomePageComponent';
import WidgetCreatePage from '../../src/components/WidgetCreatePageComponent';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getContent(){
    return window.console.log('getContent')
  }

  setContent(){
    return window.console.log('setContent')
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={HomePageWidget}>
          <Route path="create" component={WidgetCreatePage}/>
          {/*
          <Route path="users" component={Users}>
            <Route path="/user/:userId" component={User}/>
          </Route>
          <Route path="*" component={NoMatch}/>
          */}
        </Route>
      </Router>
    );
  }
}

AppComponent.defaultProps = {

};


export default AppComponent;
