'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'


import Icon from '../glyphicon/IndexComponent';

import { actionWidgetBlock } from '../../actions/index';
const createEditors =  actionWidgetBlock.createEditors;

//import { CreateTextBlock } from './CreateTextBlockComponent'


require('styles/navBar/ControlWidgets.scss');

class ControlWidgetsComponent extends React.Component {

  TextCreate(event){
    event.stopPropagation();
    const {id, widgetsByIndex, createEditors} = this.props;
    const elem = widgetsByIndex.filter((item) => {
      return item.id == id;
    })[0];
    const index = widgetsByIndex.findIndex(item => {
      return JSON.stringify(item) == JSON.stringify(elem);
    });

    createEditors(index);

    window.console.log(elem.id);

  }

  render() {
    return (
      <div className="controlwidgets-component">
        <div onClick={this.TextCreate.bind(this)} >
          <Icon glyph="text-width" />
        </div>
      </div>
    );
  }
}

ControlWidgetsComponent.displayName = 'NavBarControlWidgetsComponent';

// Uncomment properties you need
// ControlWidgetsComponent.propTypes = {};
// ControlWidgetsComponent.defaultProps = {};

const getAllState = state => state.WidgetBlocks;

const select = createSelector([getAllState], state => {
  return state;
});

export default connect(select, {createEditors})(ControlWidgetsComponent);
