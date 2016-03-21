'use strict';

import React from 'react';
//import CardTypes from './widgets/CardTypesComponent';
//import { DragSource, DropTarget } from 'react-dnd';
import Container from './widgets/ContainerComponent';

require('styles//WidgetCreatePage.scss');


//const cardSource = {
//  beginDrag(props) {
//    return { id: props.id };
//  }
//};
//
//const cardTarget = {
//  hover(props, monitor) {
//    const draggedId = monitor.getItem().id;
//
//    if (draggedId !== props.id) {
//      props.moveCard(draggedId, props.id);
//    }
//  }
//};
class WidgetCreatePageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.addNewBlock = this.addNewBlock.bind(this);
    this.state = {
      dragBlocks: [{
        id: 1
      }],
      shouldRender: false
    }
  }
  componentDidMount() {
    // Won't fire on server.
    this.setState({ shouldRender: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  addNewBlock() {
    var dragBlocks = this.state.dragBlocks;

    dragBlocks.push({id: dragBlocks.length + 1});

    this.setState({
      dragBlocks: dragBlocks
    });

  }

  render() {
    const { shouldRender } = this.state;
    window.console.log(this, 'this');
    return (
      <div className="widgetcreatepage-component">
        {shouldRender && <Container {...this.props} />}
        <div onClick={this.addNewBlock}>add block</div>
      </div>
    );
  }
}

//WidgetCreatePageComponent = DropTarget(CardTypes.CARD, cardTarget, connect => ({
//  connectDropTarget: connect.dropTarget()
//}))(WidgetCreatePageComponent);
//
//WidgetCreatePageComponent = DragSource(CardTypes.CARD, cardSource, (connect, monitor) => ({
//  connectDragSource: connect.dragSource(),
//  isDragging: monitor.isDragging()
//}))(WidgetCreatePageComponent);

WidgetCreatePageComponent.displayName = 'WidgetCreatePageComponent';
// Uncomment properties you need
// WidgetCreatePageComponent.propTypes = {};
WidgetCreatePageComponent.defaultProps = {
  connectDragSource: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  moveCard: React.PropTypes.func.isRequired,
  dragBlocks: React.PropTypes.array.isRequired,
  shouldRender: React.PropTypes.array.isRequired

};


export default WidgetCreatePageComponent;
