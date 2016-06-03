'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

require('styles//EditLinkText.scss');

import {drawFrame, classNames} from '../api/maggo';

import { actionWidgetList, actionPopUpBlock } from '../actions/index';

const openPopUp = actionPopUpBlock.openPopUp;
const updateWidgetBlock = actionWidgetList.updateWidgetBlock;

class EditLinkTextComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state={
      linkURL: '',
      errors: {}
    }
  }
  onChange(event){
    const url = event.target.value;
    const _drawFrame = drawFrame(this.state);
    const nextState = _drawFrame({
      linkURL: {
        $set: url
      },
      errors:{
        $set: {}
      }
    });
    this.setState(nextState);
  }
  cancel(){
    const {openPopUp} = this.props;
    openPopUp(false);
  }
  saveLink(){
    const {openPopUp, editorBlock} = this.props;
    const {elem, range} = editorBlock;
    const {linkURL} = this.state;

    let errors ={};
    let _linkURL = linkURL;
    if(_linkURL.search( /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ ) == -1) {
      errors.url = true;
    }

    if(errors.url){
      const newErrors = drawFrame(this.state)({
        errors:{
          $set: errors
        }
      });

      this.setState(newErrors);
      return false
    }else {
      if (_linkURL.indexOf('http') < 0) {
        _linkURL = 'http://' + _linkURL;
      }
    }

    document.querySelector('[data-reactid="'+elem+'"]').focus();

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    document.execCommand('insertHTML', false, '<a href="' + _linkURL + '" target="_blank">' + sel + '</a>');
    openPopUp(false);
  }
  render() {
    const {linkURL, errors} = this.state;
    const classNameUrl = classNames({
      'error': errors.url
    });
    const classNameSave = classNames({
      'save': true,
      'error': errors.url
    });
    return (
      <div className="editlinktext-component">
        <label className={classNameUrl}>
          <span>URL:</span>
          <input type="url" value={linkURL} onChange={this.onChange.bind(this)}/>
        </label>

        <div className="controlsPopUp">
          <div className="cancel" onClick={this.cancel.bind(this)}>Cancel</div>
          <div className={classNameSave} onClick={this.saveLink.bind(this)}>Add Link</div>
        </div>
      </div>
    );
  }
}

EditLinkTextComponent.displayName = 'EditLinkTextComponent';

// Uncomment properties you need
// EditLinkTextComponent.propTypes = {};
// EditLinkTextComponent.defaultProps = {};
const getWidgetBlocksState = state => state.WidgetBlocks;
const getEditorBlockState = state => state.EditorBlock;

const select = createSelector([getWidgetBlocksState, getEditorBlockState], (widgetBlocks, editorBlock) => {
  return {widgetBlocks, editorBlock};
});

export default connect(select,{updateWidgetBlock, openPopUp}
)(EditLinkTextComponent);
