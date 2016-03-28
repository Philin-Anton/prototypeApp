'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { actionWidgetTitle} from '../../actions/index';
const setTitle =  actionWidgetTitle.setTitle;

require('styles/header/Title.scss');

class TitleComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  getTitle(){
    if(this && this.props){
      return this.props.title ? this.props.title : null;
    }else{
      return null;
    }
  }

  onChange(event){
    this.props.setTitle(event.target.value);
  }

  render() {

    return (
      <div className="title-component">
        <input type="text" value={this.props.title} onChange={this.onChange.bind(this)} placeholder="Title"/>
      </div>
    );
  }
}

TitleComponent.displayName = 'HeaderTitleComponent';

// Uncomment properties you need
// TitleComponent.propTypes = {};
// TitleComponent.defaultProps = {};
const getAllState = state => state.WidgetBlocks;

const select = createSelector([getAllState], state => {
  return state;
});

export default connect(select, {setTitle})(TitleComponent);
