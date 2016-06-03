'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import Icon from '../glyphicon/IndexComponent';
import WidgetTypes from './CardTypesComponent';

import RichEditor from '../editor/RichEditorComponent';
import ImageBlock from '../ImageBlockComponent.js';

import {  classNames, throttle, md } from '../../api/maggo';

require('styles/widgets/WidgetBlock.scss');
let isDraggable = true;
let isRange = false;

const widgetSource = {
  beginDrag(props) {
    return { id: props.id };
  },
  canDrag(){
    return isDraggable ? true : false;
  }
};

let hover = (props, monitor) => {
  const draggedId = monitor.getItem().id;

  if (draggedId !== props.id) {
    props.widgetsListMove(draggedId, props.id);
  }
};

hover = throttle(hover, 100);

const widgetTarget = {
  hover
};

class WidgetBlocksListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  onClick(){
    const {getWidgetElem, widgetsCheck/*, type*/} = this.props;
    widgetsCheck(getWidgetElem);
    //if(type == 'text'){
    //  var editor =  ReactDOM.findDOMNode(this.refs.richEditor).firstChild;
    //  editor.focus();
    //}
  }
  deleteBlock(event){
    event.stopPropagation();
    const {deleteWidgetBlock, widgetsCheck, id} = this.props;
    deleteWidgetBlock(id);
    widgetsCheck({});
  }

  addLink(typeBlock){
    return (event) => {
      event.stopPropagation();
      const {openPopUp, changeStepPopUp, changeTitlePopUp} = this.props;
      if(!isRange) return false;
      openPopUp(true);
      switch (typeBlock){
        case 'image':
          changeStepPopUp('edit-link-image');
          break;
        case 'text':
          changeStepPopUp('edit-link-text');
          break;
      }
      changeTitlePopUp('Edit link');
    };
  }
  htmlToObject(){
    const {html} = this.props;
    if(!html) return false;
    const DIV = document.createElement('div');
    DIV.innerHTML = html;
    return DIV;
  }

  _saveRange(){
    const {saveRange} = this.props;
    let range, preSelectionRange;
    if (window.getSelection && document.createRange) {
      if(window.getSelection() &&  window.getSelection().getRangeAt(0)){
        range = window.getSelection().getRangeAt(0);
        preSelectionRange = range.cloneRange();
      }
    }else if (document.selection && document.body.createTextRange) {
      range = document.selection.createRange();
      preSelectionRange = document.body.createTextRange();
    }
    var editor =  ReactDOM.findDOMNode(this.refs.richEditor).firstChild;
    if(preSelectionRange && preSelectionRange.endOffset && (preSelectionRange.endOffset != preSelectionRange.startOffset)){
      isRange = true;
      saveRange(editor);
    }else{
      isRange = false;
      return false;
    }
  }

  render() {
    const {id, isDragging, connectDragSource, connectDropTarget, connectDragPreview, html, type, getCheckWidget, range} = this.props;
    const itsRight = getCheckWidget ? getCheckWidget.id === id: false;
    const className = classNames({
      'widgetblock-component':true,
      'isDragging': isDragging ? 0 : 1,
      'active': itsRight
    });

    let isTrueRange = false;

    if(md.mobile()|| md.phone() || md.tablet()){
      isTrueRange = true;
    }else{
      if(range && range.endOffset && (range.endOffset != range.startOffset)){
        isTrueRange = true;
      }
    }


    let returnContent = null;
    let linkMenu = null;

    if(type == 'line'){
      returnContent = <div dangerouslySetInnerHTML={{ __html: html }}></div>
    }else if(type == 'text'){
      linkMenu = 'text';
      returnContent = <RichEditor ref="richEditor" key={'RichEditor-'+id} id={id} html={html}/>
    }else if(type == 'image'){
      linkMenu = 'image';
      returnContent = <ImageBlock html={html}/>
    }

    return connectDropTarget(connectDragPreview(
      <div className={className} onClick={this.onClick.bind(this)}>
        {
          itsRight ?
            <div className='service-pad'>
              <div className='block-menu'>
                {
                  linkMenu ?
                    isTrueRange && linkMenu == 'text' ?
                      <div className="bottom-control" onMouseDown={this._saveRange.bind(this)} onTouchStart={this._saveRange.bind(this)} onClick={this.addLink.call(this, linkMenu).bind(this)}>
                        <Icon glyph='link'/>
                      </div>
                    : null
                  : null
                }
                <div className="bottom-control" onClick={this.deleteBlock.bind(this)}>
                  <Icon glyph='trash'/>
                </div>
              </div>
            </div>:
            ''
        }
        {
          connectDragSource(
            <div className="dragSource" />
          )
        }

        {returnContent}
      </div>
    ));
  }

  componentDidMount(){
    //var editor = ReactDOM.findDOMNode(this).querySelector('.editor');
    //
    //editor.addEventListener('focus', function() {
    //  isDraggable = false;
    //}.bind(this));
    //
    //editor.addEventListener('blur', function() {
    //  isDraggable = true;
    //}.bind(this));
  }
}

WidgetBlocksListComponent.displayName = 'WidgetsWidgetBlocksListComponent';

// Uncomment properties you need

WidgetBlocksListComponent.propTypes = {
  connectDragPreview: React.PropTypes.func.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
  id: React.PropTypes.any.isRequired,
  html: React.PropTypes.any.isRequired,
  widgetsListMove: React.PropTypes.func.isRequired,
  widgetsCheck: React.PropTypes.func.isRequired,
  getWidgetElem: React.PropTypes.object.isRequired
};
// WidgetBlocksListComponent.defaultProps = {};

WidgetBlocksListComponent = DropTarget(WidgetTypes.CARD, widgetTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))(WidgetBlocksListComponent);

WidgetBlocksListComponent = DragSource(WidgetTypes.CARD, widgetSource, (connect, monitor) => ({
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(WidgetBlocksListComponent);

export default WidgetBlocksListComponent;
