'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

require('styles/editor/RichEditor.scss');

import { drawFrame } from '../../api/maggo';

import { actionRichEditor, actionWidgetBlock } from '../../actions/index';

const saveRange = actionRichEditor.saveRange;
const getRange = actionRichEditor.getRange;
const addHtml = actionWidgetBlock.addHtml;

class RichEditorComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      html: props.html ||'<p><br/></p>'
    };
  }
  whichTag(tagName){
    var sel, containerNode;
    tagName = tagName.toUpperCase();
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount > 0) {
        containerNode = sel.getRangeAt(0).commonAncestorContainer;
      }
    }else if( (sel = document.selection) && sel.type != 'Control' ) {
      containerNode = sel.createRange().parentElement();
    }
    while (containerNode) {
      if (containerNode.nodeType == 1 && containerNode.tagName == tagName) {
        return true;
      }
      containerNode = containerNode.parentNode;
    }
    return false;
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
  removeChild(){
    var range = window.getSelection().getRangeAt(0);
    var element = range.commonAncestorContainer;
    var elementPrev = element.previousElementSibling;
    switch (element.nodeName){
      case 'FIGURE':
        // window.console.dir(element.previousElementSibling, 'element');
        element.parentElement.removeChild(element);
    }

    document.execCommand('formatblock',false,'P');

    this.moveToEnd(elementPrev.nextElementSibling);

    //this.moveToEnd(window.getSelection().getRangeAt(0));
  }


  moveToEnd(element) {
    var range = document.createRange();
    var sel = window.getSelection();

    try{
      range.setStart(element.lastChild, element.lastChild.textContent.length);
    }catch(e){
      range.setStart(element.lastChild.lastChild, element.lastChild.textContent.length);
    }

    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  onMouseDown(e){
    //e.preventDefault();
  }
  onClick(){
    var editor =  ReactDOM.findDOMNode(this.refs.editor);
    editor.focus();
    const {saveRange} = this.props;
    saveRange(editor);
  }
  onMouseUp(){

  }

  onKeyDown(e){
    this.reFormatBlock.call(this, e)
  }

  onInput(e){
    const {saveRange, addHtml, id} = this.props;
    var editor =  ReactDOM.findDOMNode(this.refs.editor);
    saveRange(editor);

    addHtml(id, e.target.innerHTML);
  }
  render() {
    const { html } = this.props;
    return (
      <div className="richeditor-сomponent" >
        <div contentEditable="true" className="editor" ref="editor"
             onMouseDown={this.onMouseDown.bind(this)}
             onClick={this.onClick.bind(this)}
             onMouseUp={this.onMouseUp.bind(this)}
             onInput={this.onInput.bind(this)}
             onKeyDown={this.onKeyDown.bind(this)}
             dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

  componentDidMount(){

  }

}



RichEditorComponent.displayName = 'EditorRichEditorComponent';

// Uncomment properties you need
// RichEditorComponent.propTypes = {};
// RichEditorComponent.defaultProps = {};

const getEditorBlockState = state => state.EditorBlock;
const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getEditorBlockState, getWidgetBlocksState], (editorBlock, widgetBlocks )=> {
  return {
    editorBlock,
    widgetBlocks
  };
});

export default connect(select, {saveRange, getRange, addHtml})(RichEditorComponent);
