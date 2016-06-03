'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Header from './header/IndexComponent';
import WidgetsList from './widgets/WidgetsListComponent.js';
import Footer from '../../src/components/FooterComponent';
import PopUp from '../../src/components/popup/IndexComponent';
import Title from './header/TitleComponent';
import Tags from './TagsComponent';

require('styles//HomeContainer.scss');

import { actionWidgetList, actionRichEditor } from '../actions/index';

const checkWidgetBlock = actionWidgetList.checkWidgetBlock;
const deleteRange = actionRichEditor.deleteRange;

class HomeContainerComponent extends React.Component {
  rememberBaseMenu(){
    this.props.checkWidgetBlock({});
    this.props.deleteRange();
  }
  render() {
    const { bodyColor, checkWidget} = this.props;
    return (
      <div className={'homecontainer-component '} >
        <Header/>
        <div className="homecontainer-component-content">
          <div className={'fix-wrapper article color-' + bodyColor.id}>
            <Title/>
            <WidgetsList/>
            <Tags/>
          </div>
        </div>
        <Footer/>
        <PopUp/>
        {
          !!checkWidget &&checkWidget.type ?
            <div className="rememberBaseMenu" onClick={this.rememberBaseMenu.bind(this)}></div>
            : ''
        }
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

export default connect(select,{checkWidgetBlock, deleteRange})(HomeContainerComponent);
