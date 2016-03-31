'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

require('styles/editor/RichEditor.scss');

class RichEditorComponent extends React.Component {
  constructor(props) {
    super(props);
    //let { onChange } = props;
  }

  moveToEnd(element) {
    var range = document.createRange();
    var sel = window.getSelection();

    try{
      range.setStart(element.lastChild, element.lastChild.innerText.length);
    }catch(e){
      range.setStart(element.lastChild.lastChild, element.lastChild.innerText.length);
    }


    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
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


  EditorExecCommand(command_param){
    var editor =  ReactDOM.findDOMNode(this.refs.editor);
    document.execCommand( command_param );
    editor.focus();
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

    window.console.log(elementPrev);
    window.console.dir(elementPrev);
    this.moveToEnd(elementPrev.nextElementSibling);

    //this.moveToEnd(window.getSelection().getRangeAt(0));
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
  controlNavBar(){
    const refs =  this.refs;
    ReactDOM.findDOMNode(refs.editor).focus();

    const {removeFormat} =  this.refs;
    let inlineState = [];
    for(var item in refs){
      if (item == 'editor') return;
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
    let html = ReactDOM.findDOMNode(removeFormat);
    if(inlineState.length > 2){
      html.className = html.className.replace(/active/g, '');
      html.className = html.className + ' active'
    }else{
      html.className = html.className.replace(/active/g, '');
    }
  }

  insertHTML(elem){
    if(elem == 'img'){
      let img = '<figure style="text-align: center;"><img src="http://placekitten.com/200/300" alt=""/></figure><p><br/></p>';
      document.execCommand('insertHTML', true, img);
    }

  }

  render() {
    const { value, onTextChange} = this.props;
    return (
      <div className="richeditor-сomponent" >
        <input type="button"  onClick={this.removeFormat.bind(this)} ref="removeFormat" value="T"/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'Bold' )} ref="Bold" value=" B "/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'Italic'  )} ref="Italic" value=" I "/>
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'Underline'  )} ref="Underline" value=" U "/>
        &nbsp;
        <input type="button" onClick={this.EditorExecCommand.bind(this, 'removeFormat'  )} ref="removeFormat" value=" removeFormat "/>
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

        <div contentEditable="true" id="editor" ref="editor" onClick={this.controlNavBar.bind(this)} onInput={onTextChange} onKeyDown={this.reFormatBlock.bind(this)} dangerouslySetInnerHTML={{ __html: value }} />
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

export default RichEditorComponent;
