'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {drawFrame} from '../../api/maggo';

require('styles/header/BodyColor.scss');

import { actionWidgetBodyColor } from '../../actions/index';
const setBodyColor = actionWidgetBodyColor.setBodyColor;

class BodyColorComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      openPopUp: false
    };
    this.drawFrame = drawFrame(this.state);
  }

  getColors() {
    return [
      '#e10c0c', '#ff3232', '#fe8181', '#cc9933', '#facd73', '#f3eb92', '#27bbf1', '#81d6f7', '#a3fffb',
      '#ac2a4d', '#ff3399', '#f3cad2', '#ffa500', '#ffcc00', '#f9e257', '#2e32ea', '#336699', '#c1cbe8',
      '#e717c7', '#ef5ba8', '#f6ebeb', '#eeb73e', '#f6df77', '#f2e8cd', '#243f78', '#88bff7', '#e7f2fd',
      '#a53976', '#c25d96', '#db8eba', '#6b8f23', '#9acd32', '#cce698', '#b24700', '#cc5200', '#e55b00',
      '#5a43c0', '#8b7bd2', '#bdb3e5', '#a3a328', '#cccc33', '#dbdb97', '#b95340', '#d64920', '#dc7d6a',
      '#684678', '#b392bb', '#d1c7d6', '#7cd3af', '#bde9d7', '#f1faf7', '#ff6600', '#ff934c', '#ffdec9',
      '#6b6262', '#998c8c', '#c6b8b8', '#333333', '#999999', '#cccccc', '#303a4c', '#566986', '#dee9ea',
      '#463939', '#7d7474', '#b5afaf', '#5e717d', '#7e8d97', '#bbcdd1', '#e4ddd4', '#dcdfe1', '#d0cbc8',
      '#977b6c', '#b6a298', '#eae4e1', '#808590', '#a2a6b0', '#d0d2d7', '#544968', '#c0b3ab', '#bcb5c8'
    ];
  }

  checkColorBody(event) {
    const className = event.target.className;
    const ID = className.split('-')[1];
    const color = this.getColors()[ID];

    this.props.setBodyColor(ID, color);
    this.closePopup.call(this);
  }

  renderPopUp() {
    const active = (index) => (
      index == this.props.bodyColor.id ? 'active' : ''
    );
    return (
      <div>
        <div className="body-color-pop-up">
          <div className="list-colors" /* style={{width : (this.getColors().length+1)/2 * (45 + 2) + 2 + 'px'}} */ >
            {
              this.getColors().map((item, index) => (
                <div key={index} onClick={this.checkColorBody.bind(this)} className={active(index) + ' color-'+index}>
                </div>
              ))
            }
          </div>
        </div>
        <div className="background-popup-body-color" onClick={this.closePopup.bind(this)}></div>
      </div>
    )
  }

  openPopup() {
    const {isMore, selectionMore} = this.props;

    if(isMore){
      selectionMore();
    }

    const nextState = this.drawFrame({
      $set: {
        openPopUp: true
      }
    });
    this.setState(nextState);
  }

  closePopup() {
    const nextState = this.drawFrame({
      $set: {
        openPopUp: false
      }
    });
    this.setState(nextState);
    return false;
  }

  onClick() {
    this.openPopup.call(this);
    return false;
  }

  render() {
    return (
      <div className="bodycolor-component">
        <div className="bottom-control" onClick={this.onClick.bind(this)}>
          <span className="custom-icon custom-icon-palitra"></span>
        </div>
        {this.state.openPopUp ? this.renderPopUp.call(this) : null}
      </div>
    );
  }
}

BodyColorComponent.displayName = 'HeaderBodyColorComponent';

// Uncomment properties you need
// BodyColorComponent.propTypes = {};
// BodyColorComponent.defaultProps = {};
const getAllState = state => state.WidgetBlocks;

const select = createSelector([getAllState], state => {
  return state;
});

export default connect(select, {setBodyColor})(BodyColorComponent);
