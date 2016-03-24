/**
 * Created by Anton.Filin on 23.03.2016.
 */

import * as types from '../constants/ActionTypes';
import update from 'react/lib/update';

const InitState = {
  widgetsById:{},
  widgetsByIndex:[]
};

function WidgetBlocks(state = InitState, action){

  var GlobalSugar = {
    drawFrame: function(updateFn){
      const nextState = update(state, updateFn);
      this.requestedFrame = null;
      window.console.log(nextState);
      return nextState;
    },
    scheduleUpdate: function(updateFn){

      if (!this.requestedFrame) {
        this.requestedFrame = requestAnimationFrame(this.drawFrame.bind(this, updateFn));
      }
    }
  };

  switch (action.type) {
    case types.REORDER_WIDGET_BLOCKS:

      return action;

    case types.ADD_WIDGET_BLOCKS:

      const newWidgets = {
        id: Object.keys(state.widgetsById).length
      };
      const ID = newWidgets.id;

      state.widgetsById[ID] = newWidgets;

      return GlobalSugar.drawFrame({
        widgetsById: {
          $set: state.widgetsById
        },
        widgetsByIndex: {
          $push: [
            newWidgets
          ]
        }
      });

    case types.REMOVE_WIDGET_BLOCKS:
      return action;
    default:
      return state
  }
}
export default WidgetBlocks;

