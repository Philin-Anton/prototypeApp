/**
 * Created by Anton.Filin on 23.03.2016.
 */

import * as types from '../constants/ActionTypes';
import {drawFrame, getLocalStore, setLocalStore} from '../api/maggo';
import {tagController, forSalesController, titleController, bodyColorController, listBlockController, blockController } from './controllers/index';


const InitState = getLocalStore() || {
  widgetsById:{},
  widgetsByIndex:[],
  title: '',
  tags:[],
  bodyColor: {
    id: 0,
    value: '#e10c0c'
  },
  forSales: false
};

function WidgetBlocks(state = InitState, action){

  const _drawFrame = drawFrame(state);
  const _tagController = tagController(state, action, _drawFrame);
  const _forSalesController = forSalesController(state, action, _drawFrame);
  const _titleController = titleController(state, action, _drawFrame);
  const _bodyColorController = bodyColorController(state, action, _drawFrame);
  const _listBlockController = listBlockController(state, action, _drawFrame);
  const _blockController = blockController(state, action, _drawFrame);

  const inspection = function(){
    switch (action.type) {
      case types.REORDER_WIDGET_BLOCKS:
        return _listBlockController.reorderBlocks();

      case types.ADD_WIDGET_BLOCKS:
        return _listBlockController.addBlocks();

      case types.REMOVE_WIDGET_BLOCKS:
        return _listBlockController.deleteBlocks();

      case types.GET_TAGS:
        return _tagController.getTags();

      case types.ADD_TAG:
        return _tagController.addTag();

      case types.DELETE_TAG:
        return _tagController.deleteTag();

      case types.CHANGE_FOR_SALES:
        return _forSalesController.changeForSales();

      case types.SET_TITLE:
        return _titleController.setTitle();

      case types.SET_BODY_COLOR:
        return _bodyColorController.setBodyColor();

      case types.CREATE_EDITORS:
        return _blockController.createEditors();

      case types.ADD_HTML:
        return _blockController.addHtml();

      default:
        return state;
    }
  };

  const returnState = inspection();
  setLocalStore(returnState);
  return returnState


}
export default WidgetBlocks;

