'use strict';

import React from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import WidgetBlocksList from './WidgetBlocksListComponent';


require('styles/widgets/WidgetsList.scss');

class WidgetsListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.addWidget = this.addWidget.bind(this);
    this.drawFrame = this.drawFrame.bind(this);
    this.widgetsListMove = this.widgetsListMove.bind(this);

    const widgetsById = {};
    const widgetsByIndex = [];
    this.state = JSON.parse(localStorage.getItem('bfMaggo')) || {
        widgetsById,
        widgetsByIndex
      };
  }

  widgetsListMove(id, afterId) {

    const widgetsById = this.state.widgetsById;
    const widgetsByIndex = this.state.widgetsByIndex;

    const widget = widgetsById[id];
    const afterWidget = widgetsById[afterId];

    var widgetIndex = null;

    var afterIndex = null;
    var index = 0;
    for (let item of widgetsByIndex) {
      if(JSON.stringify(item) == JSON.stringify(widget)){
        widgetIndex = index;
        break;
      }
      index++;
    }
    index = 0;
    for (let item of widgetsByIndex) {
      if(JSON.stringify(item) == JSON.stringify(afterWidget)){
        afterIndex = index;
        break;
      }
      index++;
    }
    index = null;

    this.scheduleUpdate({
      widgetsByIndex: {
        $splice: [
          [widgetIndex, 1],
          [afterIndex, 0, widget]
        ]
      }
    });
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.requestedFrame);
  }
  scheduleUpdate(updateFn) {
    this.pendingUpdateFn = updateFn;

    if (!this.requestedFrame) {
      this.requestedFrame = requestAnimationFrame(this.drawFrame);
    }
  }

  drawFrame() {
    const nextState = update(this.state, this.pendingUpdateFn);
    this.setState(nextState);

    localStorage.clear();
    localStorage.setItem('bfMaggo', JSON.stringify(this.state));

    this.pendingUpdateFn = null;
    this.requestedFrame = null;
}

  addWidget() {

    const {widgetsById/*, widgetsByIndex*/} = this.state;

    const newWidgets = {
      id: Object.keys(widgetsById).length
    };

    widgetsById[newWidgets.id] = newWidgets;

    this.scheduleUpdate({
      widgetsById: {
        $set: widgetsById
      },
      widgetsByIndex: {
        $push: [
          newWidgets
        ]
      }
    });

  }

  render() {
    const { widgetsByIndex } = this.state;
    return (
      <div className="widgetslist-component">
        {
          widgetsByIndex.map(widget => (
            <WidgetBlocksList
              key={'key-'+widget.id}
              id={widget.id}
              widgetsListMove={this.widgetsListMove}
              />
          ))
        }
        <div onClick={this.addWidget}>
          Add Widget
        </div>
      </div>
    )
  }
}

WidgetsListComponent.displayName = 'WidgetsWidgetsListComponent';

// Uncomment properties you need
// WidgetsListComponent.propTypes = {};
// WidgetsListComponent.defaultProps = {};

export default DragDropContext(HTML5Backend)(WidgetsListComponent);
