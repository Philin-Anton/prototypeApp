'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import WidgetTypes from './CardTypesComponent';

import RichEditor from '../editor/RichEditorComponent';

import { drawFrame,  classNames, setLocalStore, getLocalStore } from '../../api/maggo';

require('styles/widgets/WidgetBlock.scss');
let isDraggable = true;

const widgetSource = {
  beginDrag(props) {
    return { id: props.id };
  },
  canDrag(){
    return isDraggable ? true : false;
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

  render() {
    const {id, isDragging, connectDragSource, connectDropTarget , getWidgetsCheck/*, getWidgetElem*/} = this.props;
    const itsRight = getWidgetsCheck.id === id;
    const className = classNames({
      'widgetblock-component':true,
      'isDragging': isDragging ? 0 : 1,
      'check': itsRight
    });

    return connectDragSource(connectDropTarget(
      <div className={className} onClick={this.onClick.bind(this)}>
        <RichEditor value={this.state.html} onTextChange={this.onTextChange.bind(this)}  id={id}/>
      </div>
    ));
  }

  componentDidMount(){
    var editor = ReactDOM.findDOMNode(this).querySelector('.editor');

    editor.addEventListener('focus', function() {
      isDraggable = false;
    }.bind(this));

    editor.addEventListener('blur', function() {
      isDraggable = true;
    }.bind(this));
  }
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

WidgetBlocksListComponent = DropTarget(WidgetTypes.CARD, widgetTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(WidgetBlocksListComponent);

WidgetBlocksListComponent = DragSource(WidgetTypes.CARD, widgetSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(WidgetBlocksListComponent);

export default WidgetBlocksListComponent;
