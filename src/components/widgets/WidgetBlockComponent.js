'use strict';

import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import WidgetTypes from './CardTypesComponent';

import NavBar from '../navBar/ControlWidgetsComponent';

//import RichEditor from '../editor/RichEditorComponent';

import { drawFrame,  classNames } from '../../api/maggo';

import ReactQuill from 'react-quill';



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
    this.drawFrame = drawFrame(this.state);

    this.state = {
      html: ''
    };
  }

  onTextChange(html) {
    this.setState({
      html
    });
  }

  onClick(event){
    event.stopPropagation();
    const {widgetsCheck, id, getWidgetsCheck} = this.props;
    if(getWidgetsCheck.id != id) widgetsCheck(id);
  }

  getEditorContents(){
    return this.state.html
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
        { itsRight ? <NavBar id={id}/> : null }

        { id }

        {/*
         <ReactQuill onChange={this.onTextChange.bind(this)} >

         <ReactQuill.Toolbar
         key="toolbar"
         ref="toolbar"
         items={ReactQuill.Toolbar.defaultItems} />

         <div key="editor"
         ref="editor"
         className="quill-contents"
         dangerouslySetInnerHTML={{__html:this.getEditorContents()}} />

         </ReactQuill>*/}

        <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </div>
    ));
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

WidgetBlocksListComponent = DropTarget(WidgetTypes.CARD, widgetTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(WidgetBlocksListComponent);

WidgetBlocksListComponent = DragSource(WidgetTypes.CARD, widgetSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(WidgetBlocksListComponent);

export default WidgetBlocksListComponent;
