'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Header from './header/IndexComponent';
import WidgetsList from './widgets/WidgetsListComponent.js';
import FooterComponent from '../../src/components/FooterComponent';


require('styles//HomeContainer.scss');

class HomeContainerComponent extends React.Component {
  render() {
    return (
      <div className={'homecontainer-component ' + 'color-'+this.props.bodyColor.id} >
        <Header/>
        <WidgetsList />
        <FooterComponent/>
      </div>
    );
  }
}

HomeContainerComponent.displayName = 'HomeContainerComponent';

// Uncomment properties you need
// HomeContainerComponent.propTypes = {};
// HomeContainerComponent.defaultProps = {};

const getAllState = state => state.WidgetBlocks;

const select = createSelector([getAllState], state => {
  return state;
});

export default connect(select)(HomeContainerComponent);
