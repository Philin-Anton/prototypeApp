'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux'
import { createSelector } from 'reselect'


import Icon from '../glyphicon/IndexComponent';
import BodyColor from '../header/BodyColorComponent';

import { actionRichEditor } from '../../actions/index';

const saveRange = actionRichEditor.saveRange;
const restoreRange = actionRichEditor.restoreRange;
const getRange = actionRichEditor.getRange;

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

  EditorExecCommand(command_param){
    var editor =  ReactDOM.findDOMNode(this.refs.editor);
    document.execCommand( command_param );
    editor.focus();
  }

  removeFormatBlock(command_param){
    var sel = document.getSelection();
    var focusNode = sel.focusNode;
    var range = document.createRange();
    range.selectNode(focusNode);
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand( command_param );
    //frames.newTextArea.focus();
  }

  removeFormat(){
    const Bold = document.queryCommandState('Bold');
    const Italic = document.queryCommandState('Italic');
    const Underline = document.queryCommandState('Underline');

    if(Bold){
      document.execCommand( 'Bold', null, '' );
    }
    if(Italic){
      document.execCommand( 'Italic', null, '' );
    }
    if(Underline){
      document.execCommand( 'Underline', null, '' );
    }
  }

  insertHTML(elem){
    if(elem == 'img'){
      var genID = Date.now();
      let figure = '<figure style="text-align: center"><img src="http://placekitten.com/200/300" alt=""/></figure><p><br/></p>';
      document.execCommand('insertHTML', null, figure);
    }
  }
  addBlockquote(BlockElem){
    var editor =  ReactDOM.findDOMNode(this.refs.editor);
    document.execCommand( 'formatBlock', false, BlockElem );
    editor.focus();
  }

  render() {
    return (
      <div className="controlwidgets-component">

        <BodyColor />
        <div className="bottom-control" >
          <Icon glyph="minus" />
        </div>

        <div className="bottom-control" >
          <Icon glyph="picture" />
        </div>

        <div className="bottom-control" >
          <Icon glyph="font" />
        </div>

        <div className="bottom-control" >
          <Icon glyph="option-horizontal" />
        </div>


        <div className="bottom-control" onClick={this.TextCreate.bind(this)} >
          <Icon glyph="text-width" />
        </div>

        <input type="button"  onClick={this.removeFormat.bind(this)} ref="Text" value="T"/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'Bold' )} ref="Bold" value=" B "/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'Italic'  )} ref="Italic" value=" I "/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'Underline'  )} ref="Underline" value=" U "/>
        &nbsp;
        <input type="button" onClick={this.addBlockquote.bind(this, 'BLOCKQUOTE'  )} ref="Blockquote" value=" Blockquote "/>
        &nbsp;
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'JustifyLeft'  )} ref="JustifyLeft" value=" Left "/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'JustifyCenter' )} ref="JustifyCenter" value=" Center "/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'JustifyRight'  )} ref="JustifyRight" value=" Right "/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'justifyFull'  )} ref="justifyFull" value=" Full "/>
        &nbsp;
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'InsertOrderedList' )} data-value="InsertOrderedList" value=" OL "/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'InsertUnorderedList'  )} data-value="InsertUnorderedList" value=" UL "/>
        &nbsp;
        <input type="button" onClick={this.insertHTML.bind(this, 'img')} data-value="img" value=" img "/>
      </div>
    );
  }
}

ControlWidgetsComponent.displayName = 'NavBarControlWidgetsComponent';

// Uncomment properties you need
// ControlWidgetsComponent.propTypes = {};
// ControlWidgetsComponent.defaultProps = {};

const getEditorBlockState = state => state.EditorBlock;

const select = createSelector([getEditorBlockState], (editorBlock) => {
  return {editorBlock};
});

export default connect(select, {saveRange, restoreRange, getRange})(ControlWidgetsComponent);
