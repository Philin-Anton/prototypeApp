'use strict';

import React from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

require('styles/popup/Index.scss');
import FileChoose from '../FileChooseComponent';
import EditImage from '../EditImageComponent';
import EditLinkText from '../EditLinkTextComponent';

import { actionPopUpBlock } from '../../actions/index';

const openPopUp = actionPopUpBlock.openPopUp;
const closePopUp = actionPopUpBlock.closePopUp;
const changeStepPopUp = actionPopUpBlock.changeStepPopUp;
const setImagePopUp = actionPopUpBlock.setImagePopUp;

class IndexComponent extends React.Component {
  eachContent(){
    const {popUpBlock} = this.props;
    this.content = null;
    switch (popUpBlock.step){
      case null:{
        this.content = null;
        break;
      }
      case 'choose-img':{
        this.content = <FileChoose />;
        break;
      }
      case 'edit-img':{
        this.content = <EditImage imageURL={popUpBlock.image}/>;
        break;
      }
      case 'edit-link-text':{
        this.content = <EditLinkText/>;
        break;
      }
    }
    return this.content
  }
  closePopUp(e){
    if(!e.target.closest('.close-popUp') && e.target.closest('.popUpContainer')) return false;
    const {closePopUp, setImagePopUp} = this.props;
    closePopUp(false);
    setImagePopUp(null);
  }
  render() {
    const {popUpBlock} = this.props;
    if(!popUpBlock.open){
      return null;
    }
    return (
      <div className="popupindex-component">
        <div className="popUpBackground" onClick={this.closePopUp.bind(this)}></div>
        <div className={'popUpContainer ' + popUpBlock.step}>
          <div className="headerPopUp">
            {popUpBlock.title || popUpBlock.step}
            <div className="close-popUp" onClick={this.closePopUp.bind(this)}>
              <span className="action-icon action-icon-close"></span>
            </div>
          </div>
          <div className="contentPopUp">
            {this.eachContent.apply(this)}
          </div>
        </div>
      </div>
    );
  }
}

IndexComponent.displayName = 'PopupIndexComponent';

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

const getPopUpBlockState = state => state.PopUpBlock;
const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getPopUpBlockState, getWidgetBlocksState], (popUpBlock, widgetBlocks) => {
  return {popUpBlock, widgetBlocks};
});
export default connect(select, { openPopUp, closePopUp, changeStepPopUp, setImagePopUp })(IndexComponent);
