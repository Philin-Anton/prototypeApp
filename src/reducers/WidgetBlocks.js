/**
 * Created by Anton.Filin on 23.03.2016.
 */

import * as types from '../constants/ActionTypes';
import {drawFrame} from '../api/maggo';
import {tagController} from './controllers/index';


const InitState = {
  widgetsById:{},
  widgetsByIndex:[],
  tags:[]
};

function WidgetBlocks(state = InitState, action){

  const _drawFrame = drawFrame(state);
  const _tagController = tagController(state, action, _drawFrame);


  switch (action.type) {
    case types.REORDER_WIDGET_BLOCKS:

      return action;

    case types.ADD_WIDGET_BLOCKS:

      const newWidgets = {
        id: Object.keys(state.widgetsById).length
      };
      const ID = newWidgets.id;

      state.widgetsById[ID] = newWidgets;

      return _drawFrame({
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

    case types.GET_TAGS:

      return _tagController.getTags();

    case types.ADD_TAG:

      return _tagController.addTag();

    case types.DELETE_TAG:

      return _tagController.deleteTag();

    default:
      return state
  }
}
export default WidgetBlocks;

