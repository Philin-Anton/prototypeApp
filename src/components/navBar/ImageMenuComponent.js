'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { drawFrame, classNames } from '../../api/maggo';
require('styles/navBar/ImageMenu.scss');

import { actionPopUpBlock } from '../../actions/index';
const openPopUp = actionPopUpBlock.openPopUp;
const changeStepPopUp = actionPopUpBlock.changeStepPopUp;
const changeTitlePopUp = actionPopUpBlock.changeTitlePopUp;

class ImageMenuComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      orientation: 'none'
    };
    this.drawFrame = drawFrame(this.state);
  }

  htmlToObject(){
    const {html} = this.props;
    if(!html) return false;
    const DIV = document.createElement('div');
    DIV.innerHTML = html;
    return DIV;
  }

  imageOrientation(){
    let positionOrientation = 'none';
    const DIV = this.htmlToObject.call(this);
    const figure = DIV.childNodes[0];

    const styleAttr = figure.className;

    if(styleAttr && styleAttr.indexOf('none') === -1){
      positionOrientation = styleAttr.indexOf('left') != -1 ? 'left' : 'right';
    }
    return positionOrientation;
  }

  selectOrientation(orientation){
    const {changeIMAGE} = this.props;
    const DIV = this.htmlToObject.call(this);
    const figure = DIV.childNodes[0];
    figure.className = 'align-' + orientation;
    changeIMAGE(DIV.innerHTML);
  }
  openPopUp(namePopUp){
    const {openPopUp, changeStepPopUp, changeTitlePopUp} = this.props;
    openPopUp(true);
    changeStepPopUp(namePopUp);
    changeTitlePopUp('Edit Photo');
  }
  render() {
    const orientation = this.imageOrientation.call(this);


    const classNamesLeft = classNames({
      'bottom-control': true,
      'active': orientation == 'left'
    });
    const classNamesCenter = classNames({
      'bottom-control': true,
      'active': orientation == 'none'
    });
    const classNamesRight = classNames({
      'bottom-control': true,
      'active': orientation == 'right'
    });

    return (
      <div className="imagemenu-component">
        <div className="fix-wrapper">
          <div className="bottom-control" onClick={this.openPopUp.bind(this, 'edit-img')}>
            <span className="custom-icon custom-icon-edit"></span>
          </div>
          <div className={classNamesLeft} onClick={this.selectOrientation.bind(this, 'left')}>
            <span className="custom-icon custom-icon-align-left"></span>
          </div>
          <div className={classNamesCenter} onClick={this.selectOrientation.bind(this, 'none')}>
            <span className="custom-icon custom-icon-align-center"></span>
          </div>
          <div className={classNamesRight} onClick={this.selectOrientation.bind(this, 'right')}>
            <span className="custom-icon custom-icon-align-right"></span>
          </div>
        </div>
      </div>
    );
  }
}

ImageMenuComponent.displayName = 'NavBarImageMenuComponent';

// Uncomment properties you need
// ImageMenuComponent.propTypes = {};
// ImageMenuComponent.defaultProps = {};

const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getWidgetBlocksState], (widgetBlocks) => {
  return {widgetBlocks};
});

export default connect(select,{openPopUp, changeStepPopUp, changeTitlePopUp})(ImageMenuComponent);
