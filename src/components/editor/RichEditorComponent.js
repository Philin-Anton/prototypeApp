'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux'
import { createSelector } from 'reselect'

require('styles/editor/RichEditor.scss');

import {drawFrame, throttle} from '../../api/maggo';
import { actionRichEditor, actionWidgetBlock } from '../../actions/index';

const saveRange = actionRichEditor.saveRange;
const restoreRange = actionRichEditor.restoreRange;
const addHtml = actionWidgetBlock.addHtml;

class RichEditorComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      html: props.html || '<p><br/></p>'
    };

    this.drawFrame = drawFrame(this.state);

    this.saveRange = throttle(this.saveRange, 100);
  }

  reFormatBlock(e){
    if (e.keyCode === 13) {
      const NodeName = this.props.editorBlock.range.commonAncestorContainer.parentNode.nodeName;
      //debugger;
      switch(NodeName){
        case 'DIV':
          document.execCommand('formatBlock',null, 'P');
          document.execCommand( 'justifyFull' );
        break;
        case 'H1':
          document.execCommand('formatBlock',null, 'H1');
          document.execCommand( 'justifyCenter' );
          break;
        case 'P':
          document.execCommand('formatBlock',null, 'P');
              break;
        case 'BLOCKQUOTE':
          document.execCommand('formatBlock',null, 'BLOCKQUOTE');
              break;
      }

    }
    if (e.keyCode == 37) window.setTimeout(this.saveRange.bind(this));
    if (e.keyCode == 38) window.setTimeout(this.saveRange.bind(this));
    if (e.keyCode == 39) window.setTimeout(this.saveRange.bind(this));
    if (e.keyCode == 40) window.setTimeout(this.saveRange.bind(this));
  }

  saveRange(){
    var editor =  ReactDOM.findDOMNode(this.refs.editor);
    const {saveRange} = this.props;
    saveRange(editor);
  }
  onClick(){
    var editor =  ReactDOM.findDOMNode(this.refs.editor);
    editor.focus();
    this.saveRange()
  }

  onKeyDown(e){
    this.reFormatBlock.call(this, e)
  }

  emitChange(){
    const {saveRange, addHtml, id} = this.props;
    var editor =  ReactDOM.findDOMNode(this.refs.editor);
    saveRange(editor);
    var html = editor.innerHTML;
    if (addHtml && html !== this.lastHtml) {
      addHtml(id, html);
    }
    this.lastHtml = html;
  }
  //componentWillMount(){
  //  //document.removeEventListener('touchstart, touchend, touchmove', this._saveRange.bind(this));
  //}
  //componentWillUpdate(){
  //  //document.removeEventListener('touchstart, touchend, touchmove', this._saveRange.bind(this));
  //}
  render() {
    const { html } = this.props;
    return (
      <div className="richeditor-сomponent">
        <div contentEditable="true" className="editor" ref="editor"
             onClick={this.onClick.bind(this, 'onClick')}
             onInput={this.emitChange.bind(this)}
             onBlur={this.emitChange.bind(this)}
             onKeyDown={this.onKeyDown.bind(this)}
             dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

  shouldComponentUpdate(nextProps){
    return nextProps.html !== ReactDOM.findDOMNode(this.refs.editor).innerHTML;
  }
  //componentDidMount(){
  //  //document.addEventListener('touchstart, touchend, touchmove', this._saveRange.bind(this));
  //}
  //componentDidUpdate(){
  //  //.addEventListener('touchstart, touchend, touchmove', this._saveRange.bind(this));
  //}
}

RichEditorComponent.displayName = 'EditorRichEditorComponent';

// Uncomment properties you need
RichEditorComponent.propTypes = {
 id: React.PropTypes.any.isRequired,
 html: React.PropTypes.any.isRequired
};
// RichEditorComponent.defaultProps = {};

const getEditorBlockState = state => state.EditorBlock;
const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getEditorBlockState, getWidgetBlocksState], (editorBlock, widgetBlocks )=> {
  return {
    editorBlock,
    widgetBlocks
  };
});

export default connect(select, {saveRange, restoreRange, addHtml})(RichEditorComponent);
