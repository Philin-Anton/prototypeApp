'use strict';

import React from 'react';
//import ReactDOM from 'react-dom';

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {getMax, drawFrame} from '../../api/maggo';

//import Icon from '../glyphicon/IndexComponent';

import BaseMenu from './BaseMenuComponent';
//import HrMenu from './HrMenuComponent';
import TextMenu from './TextMenuComponent';
import ImageMenu from './ImageMenuComponent.js';
import More from './MoreComponent.js';

import { actionRichEditor, actionWidgetList, actionPopUpBlock } from '../../actions/index';

const updateWidgetBlock = actionWidgetList.updateWidgetBlock;
const checkWidgetBlock = actionWidgetList.checkWidgetBlock;
const addWidgetBlock = actionWidgetList.addWidgetBlock;

const saveRange = actionRichEditor.saveRange;
const getRange = actionRichEditor.getRange;
const setTypeCursor = actionRichEditor.setTypeCursor;

const setImagePopUp = actionPopUpBlock.setImagePopUp;
const openPopUp = actionPopUpBlock.openPopUp;
const closePopUp = actionPopUpBlock.closePopUp;
const changeStepPopUp = actionPopUpBlock.changeStepPopUp;
const changeTitlePopUp = actionPopUpBlock.changeTitlePopUp;

//import { CreateTextBlock } from './CreateTextBlockComponent'

require('styles/navBar/ControlWidgets.scss');

class ControlWidgetsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isMore: false
    };
    this.drawFrame = drawFrame(this.state);
  }

  reStoreCursor(range) {
    var sel = document.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  addWidget(type, defauntHTML) {
    const {addWidgetBlock, checkWidgetBlock, widgetBlocks} = this.props;
    const {widgetsByIndex} = widgetBlocks;
    const getMaxID = !!widgetsByIndex[0] ? getMax(widgetsByIndex, 'id') : -1;
    const newWidgets = {
      id: getMaxID + 1,
      type: type,
      html: defauntHTML || ''
    };
    addWidgetBlock(newWidgets);
    checkWidgetBlock(newWidgets);
  }

  selectionHR() {
    this.addWidget.call(this, 'line', '<hr class="hr-solid-decorated"/>');
  }

  selectionText() {
    this.addWidget.call(this, 'text', '<p style="text-align: justify;"><br/></p>');
  }

  selectionIMG() {
//    this.addWidget.call(this, 'image', '');
    const {openPopUp, changeStepPopUp, changeTitlePopUp} = this.props;
    openPopUp(true);
    changeStepPopUp('choose-img');
    changeTitlePopUp('Select Photo');
  }

  selectionMobileIMG(path) {
    const {openPopUp, changeStepPopUp, changeTitlePopUp, setImagePopUp} = this.props;
    openPopUp(true);
    changeStepPopUp('edit-img');
    changeTitlePopUp('Edit Photo');
    setImagePopUp(path);
  }

  selectionMore(bool) {
    //this.props.selectLine(false);
    let isMore = !!this.state.isMore ? false : true;
    if (bool == 'false') {
      isMore = false;
    }
    const _drawFrame = drawFrame(this.state);

    const nextState = _drawFrame({
      isMore: {
        $set: isMore
      }
    });
    this.setState(nextState);
  }

  changeHR(newLine) {
    const {updateWidgetBlock} = this.props;
    const {checkWidget} = this.props.widgetBlocks;
    checkWidget.html = newLine;
    updateWidgetBlock(checkWidget);
  }

  changeTEXT(typeElem) {
    const {range} = this.props.editorBlock;
    if (!range.commonAncestorContainer) return false;
    const _this = this;
    return ()=> {
      _this.reStoreCursor(range);
      switch (typeElem) {
        case 'justify':
          document.execCommand('formatBlock', null, 'P');
          document.execCommand('justifyFull');
          break;
        case 'title':
          document.execCommand('formatBlock', null, 'H1');
          document.execCommand('justifyCenter');
          break;
        case 'blockquote':
          document.execCommand('formatBlock', null, 'BLOCKQUOTE');
          document.execCommand('justifyFull');
          break;
        case 'center':
          document.execCommand('formatBlock', null, 'P');
          document.execCommand('justifyCenter');
          break;
      }
    }
  }

  changeIMAGE(newImageBlock) {
    const {updateWidgetBlock} = this.props;
    const {checkWidget} = this.props.widgetBlocks;
    checkWidget.html = newImageBlock;
    updateWidgetBlock(checkWidget)
  }

  rememberBaseMenu() {
    this.props.checkWidgetBlock({});
  }

  render() {
    const {widgetBlocks, editorBlock, checkWidgetBlock} = this.props;
    const {checkWidget} = widgetBlocks;
    const {range} = editorBlock;
    const {isMore} = this.state;
    let ReturnMenu = null;

    if (checkWidget && checkWidget.type == 'line') {
      ReturnMenu = <BaseMenu checkWidgetBlock={checkWidgetBlock}/>;
    } else if (checkWidget && checkWidget.type == 'text') {
      ReturnMenu = <TextMenu changeTEXT={ this.changeTEXT.bind(this)} range={ range }/>
    } else if (checkWidget && checkWidget.type == 'image') {
      ReturnMenu = <ImageMenu changeIMAGE={ this.changeIMAGE.bind(this)} html={ checkWidget.html } range={ range }/>
    } else {
      ReturnMenu = <BaseMenu selectionIMG={this.selectionIMG.bind(this)} selectionHR={this.selectionHR.bind(this)}
                             selectionMobileIMG={this.selectionMobileIMG.bind(this)}
                             selectionText={this.selectionText.bind(this)} isMore={isMore}
                             selectionMore={this.selectionMore.bind(this)}/>;
    }

    return (
      <div className="controlwidgets-component">
        {isMore ?
          <div>
            <More selectionMore={this.selectionMore.bind(this)}/>

            <div className="background-popup-more" onClick={this.selectionMore.bind(this)}></div>
          </div>
          : null}
        {ReturnMenu}
      </div>
    );
  }
}

ControlWidgetsComponent.displayName = 'NavBarControlWidgetsComponent';

// Uncomment properties you need
// ControlWidgetsComponent.propTypes = {};
// ControlWidgetsComponent.defaultProps = {};

const getEditorBlockState = state => state.EditorBlock;
const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getEditorBlockState, getWidgetBlocksState], (editorBlock, widgetBlocks) => {
  return {editorBlock, widgetBlocks};
});

export default connect(select,
  {
    updateWidgetBlock,
    checkWidgetBlock,
    addWidgetBlock,
    saveRange,
    setTypeCursor,
    getRange,
    openPopUp,
    closePopUp,
    changeTitlePopUp,
    changeStepPopUp,
    setImagePopUp
  }
)(ControlWidgetsComponent);
