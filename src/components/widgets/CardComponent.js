'use strict';

import React  from 'react';
import CardTypes from './CardTypesComponent';
import { DragSource, DropTarget } from 'react-dnd';

require('styles/widgets/Card.scss');

const cardSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

const cardTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.moveCard(draggedId, props.id);
    }
  }
};


class CardComponent extends React.Component {

render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const style = {
      border: '1px dashed gray',
      padding: '0.5rem 1rem',
      marginBottom: '.5rem',
      backgroundColor: 'white',
      cursor: 'move',
      color: '#000',
      opacity: isDragging ? 0 : 1
    };

    return connectDragSource(connectDropTarget(
      <div style={style}>
        {text}
      </div>
    ));
  }
}

CardComponent.displayName = 'WidgetsCardComponent';

CardComponent.propTypes = {
  connectDragSource: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
  id: React.PropTypes.any.isRequired,
  text: React.PropTypes.string.isRequired,
  moveCard: React.PropTypes.func.isRequired
};
// CardComponent.defaultProps = {};


CardComponent = DropTarget(CardTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(CardComponent);

CardComponent = DragSource(CardTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(CardComponent);

export default CardComponent;
