'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

require('styles/editor/RichEditor.scss');

import { actionRichEditor } from '../../actions/index';

const saveRange = actionRichEditor.saveRange;
const getRange = actionRichEditor.getRange;

class RichEditorComponent extends React.Component {
  constructor(props) {
    super(props);
    //let { onChange } = props;
  }
  controlNavBar(){
    const refs =  this.refs;
    ReactDOM.findDOMNode(refs.editor).focus();

    const {Text} =  this.refs;
    let inlineState = [];
    for(var item in refs){
      if (item == 'editor') continue;
      var obj = refs[item];
      let html = ReactDOM.findDOMNode(obj);
      //window.console.log(item);
      if(document.queryCommandState(item)){
        html.className = html.className.replace(/active/g, '');
        html.className = html.className + ' active'
      }else{
        if(item == 'Bold' || item == 'Italic' || item == 'Underline'){
          inlineState.push(item);
        }
        html.className = html.className.replace(/active/g, '');
      }
    }
    let html = ReactDOM.findDOMNode(Text);
    if(inlineState.length > 2){
      html.className = html.className.replace(/active/g, '');
      html.className = html.className + ' active'
    }else{
      html.className = html.className.replace(/active/g, '');
    }
  }
  reFormatBlock(e){
    if (e.keyCode === 13) {

      if(this.whichTag('FIGURE')){
        window.setTimeout(this.removeChild.bind(this));
        return false;
      }else{
        document.execCommand('formatblock',false,'P');
      }
    }
    if (e.keyCode == 37) window.setTimeout(this.controlNavBar.bind(this));
    if (e.keyCode == 38) window.setTimeout(this.controlNavBar.bind(this));
    if (e.keyCode == 39) window.setTimeout(this.controlNavBar.bind(this));
    if (e.keyCode == 40) window.setTimeout(this.controlNavBar.bind(this));
  }
  onMouseDown(e){
    e.preventDefault();
  }
  onClick(){
    var editor =  ReactDOM.findDOMNode(this.refs.editor);
    editor.focus();
  }
  onMouseUp(){
  }

  render() {
    const { value, onTextChange} = this.props;
    return (
      <div className="richeditor-сomponent" >
        <div contentEditable="true" className="editor" ref="editor" onMouseDown={this.onMouseDown.bind(this)} onClick={this.onClick.bind(this)} onMouseUp={this.onMouseUp.bind(this)} onInput={onTextChange} onKeyDown={this.reFormatBlock.bind(this)} dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    );
  }

  componentDidMount(){
    //document.execCommand('formatblock',false,'P');
    //const {checkIsDragging} = this.props;
    //
    //
    //var editor =  ReactDOM.findDOMNode(this.refs.editor);
    //
    //editor.addEventListener('focus', function() {
    //  checkIsDragging(true);
    //});
    //
    //editor.addEventListener('blur', function() {
    //  window.console.log(editor);
    //  checkIsDragging(false);
    //});

  }

}



RichEditorComponent.displayName = 'EditorRichEditorComponent';

// Uncomment properties you need
// RichEditorComponent.propTypes = {};
// RichEditorComponent.defaultProps = {};

const getEditorBlockState = state => state.EditorBlock;

const select = createSelector([getEditorBlockState], state => {
  return {editorBlock: state};
});

export default connect(select, {saveRange, getRange})(RichEditorComponent);
