'use strict';

import React from 'react';
//import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {drawFrame} from '../../api/maggo';

import WidgetBlock from './WidgetBlockComponent';
import { actionWidgetList } from '../../actions/index';
const addWidgetBlock = actionWidgetList.addWidgetBlock;
const deleteWidgetBlock = actionWidgetList.deleteWidgetBlock;
const reorderWidgetBlock = actionWidgetList.reorderWidgetBlock;

require('styles/widgets/WidgetsList.scss');

class WidgetsListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      widgetsCheck: {
        id : -1
      }
    };
    this.drawFrame = drawFrame(this.state);
  }

  widgetsListMove(id, afterId) {

    const widgetsByIndex = this.props.widgetsByIndex;

    const widget = widgetsByIndex.filter(item => {
      return item.id == id
    })[0];

    const afterWidget = widgetsByIndex.filter(item => {
      return item.id == afterId
    })[0];

    const widgetIndex = widgetsByIndex.findIndex(item => {
      return JSON.stringify(item) == JSON.stringify(widget);
    });

    var afterIndex = widgetsByIndex.findIndex(item => {
      return JSON.stringify(item) == JSON.stringify(afterWidget);
    });

    this.props.reorderWidgetBlock(widgetIndex, afterIndex, widget );

  }
  componentWillUnmount() {
    cancelAnimationFrame(this.requestedFrame);
  }

  addWidget() {

    const {widgetsById/*, widgetsByIndex*/} = this.props;

    const newWidgets = {
      id: Object.keys(widgetsById).length,
      html:''
    };

    widgetsById[newWidgets.id] = newWidgets;

    this.props.addWidgetBlock(widgetsById, newWidgets);

  }
  widgetsCheck(id){
    const nextState = this.drawFrame({
      widgetsCheck:{
        $set: {
          id: id
        }
      }
    });
    this.setState(nextState)
  }

  render() {
    const {widgetsByIndex } = this.props;
    return (
      <div className={'widgetslist-component ' }>
        {
          widgetsByIndex.map(widget => {
            window.console.log(widgetsByIndex, 'widgetsByIndex');
            window.console.log(widget, 'widget');
            return(
              <WidgetBlock
                key={widget.id}
                id={widget.id}
                html={widget.html ||'<p><br/></p>'}
                widgetsListMove={this.widgetsListMove.bind(this)}
                widgetsCheck={this.widgetsCheck.bind(this)}
                getWidgetsCheck = {this.state.widgetsCheck}
                getWidgetElem = {widget}
                />
            )})

        }
        <div onClick={this.addWidget.bind(this)}>
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

const getAllState = state => state.WidgetBlocks;

const select = createSelector([getAllState], state => {
  return state;
});

export default connect(select, {addWidgetBlock, reorderWidgetBlock, deleteWidgetBlock})(DragDropContext(HTML5Backend)(WidgetsListComponent));
