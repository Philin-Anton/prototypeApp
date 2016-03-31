'use strict';

import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import WidgetTypes from './CardTypesComponent';

import NavBar from '../navBar/ControlWidgetsComponent';

import RichEditor from '../editor/RichEditorComponent';

import { drawFrame,  classNames, setLocalStore, getLocalStore } from '../../api/maggo';




require('styles/widgets/WidgetBlock.scss');

const widgetSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

const widgetTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.widgetsListMove(draggedId, props.id);
    }
  }
};

class WidgetBlocksListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.state = getLocalStore('editorStore') || {
      html: '<p><br/></p>',
      status: true
    };

    this.drawFrame = drawFrame(this.state);
  }

  onTextChange(event) {

    const nextState = this.drawFrame({
      html: {
        $set: event.target.innerHTML
      }
    });

    setLocalStore(nextState,'editorStore');
    //this.setState(nextState);
  }

  onClick(event){
    event.stopPropagation();
    const {widgetsCheck, id, getWidgetsCheck} = this.props;
    if(getWidgetsCheck.id != id) widgetsCheck(id);
  }

  getEditorContents(){
    return this.state.html
  }

  checkIsDragging(status){
    window.console.log(status);
    const nextState = this.drawFrame({
      status:{
        $set: status
      }
    });
    this.setState(nextState);
  }


  render() {
    const {id, isDragging, connectDragSource, connectDropTarget , getWidgetsCheck/*, getWidgetElem*/} = this.props;
    const itsRight = getWidgetsCheck.id === id;
    const className = classNames({
      'widgetblock-component':true,
      'isDragging': isDragging ? 0 : 1,
      'check': itsRight
    });

    return connectDragSource(connectDropTarget(
      <div className={className} ref={(c) => this._connectDragSource = c} onClick={this.onClick.bind(this)}>
        { itsRight ?
          <NavBar id={id}/>
          : null }

        { id }

        <RichEditor value={this.state.html} /*checkIsDragging={this.checkIsDragging.bind(this)}*/ onTextChange={this.onTextChange.bind(this)} />

        <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </div>
    ));
  }
  //componentDidUpdate(){
  //  if(this._connectDragSource.className.indexOf('check') != -1){
  //    window.console.log( this.state.status);
  //    this._connectDragSource.setAttribute('draggable', !this.state.status);
  //  }else{
  //    this._connectDragSource.setAttribute('draggable', true);
  //  }
  //}
}

WidgetBlocksListComponent.displayName = 'WidgetsWidgetBlocksListComponent';

// Uncomment properties you need

WidgetBlocksListComponent.propTypes = {
  connectDragSource: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
  id: React.PropTypes.any.isRequired,
  widgetsListMove: React.PropTypes.func.isRequired,
  widgetsCheck: React.PropTypes.func.isRequired,
  getWidgetsCheck: React.PropTypes.object.isRequired,
  getWidgetElem: React.PropTypes.object.isRequired
};
// WidgetBlocksListComponent.defaultProps = {};

WidgetBlocksListComponent = DropTarget(WidgetTypes.CARD, widgetTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(WidgetBlocksListComponent);

WidgetBlocksListComponent = DragSource(WidgetTypes.CARD, widgetSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(WidgetBlocksListComponent);

export default WidgetBlocksListComponent;
