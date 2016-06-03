import * as types from '../constants/ActionTypes';
import {drawFrame, setContent} from '../api/maggo';
import {handleInit} from '../api/handlers';
import {tagController, forSalesController, titleController, bodyColorController, listBlockController, blockController, arrayImageBlobController } from './controllers/index';


const content =  handleInit() ? setContent(handleInit()) : false;

const InitState = content || {
  widgetsByIndex:[],
  title: '',
  tags: '',
  bodyColor: {
    id: 57
  },
  arrayImage:[]
};

function WidgetBlocks(state = InitState, action){

  const _drawFrame = drawFrame(state);
  const _tagController = tagController(state, action, _drawFrame);
  const _forSalesController = forSalesController(state, action, _drawFrame);
  const _titleController = titleController(state, action, _drawFrame);
  const _bodyColorController = bodyColorController(state, action, _drawFrame);
  const _listBlockController = listBlockController(state, action, _drawFrame);
  const _blockController = blockController(state, action, _drawFrame);
  const _arrayImageBlobController = arrayImageBlobController(state, action, _drawFrame);

  const inspection = function(){
    switch (action.type) {
      case types.REORDER_WIDGET_BLOCKS:
        return _listBlockController.reorderBlocks();

      case types.ADD_WIDGET_BLOCKS:
        return _listBlockController.addBlocks();

      case types.CHECK_WIDGET_BLOCKS:
        return _listBlockController.checkBlock();

      case types.UPDATE_WIDGET_BLOCKS:
        return _listBlockController.updateBlock();

      case types.REMOVE_WIDGET_BLOCKS:
        return _listBlockController.deleteBlocks();

      case types.SET_WIDGET_BLOCKS:
        return _listBlockController.setWidgetBlock();

      case types.ADD_TAG:
        return _tagController.addTag();

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

      case types.DELETE_ARRAY_IMAGE:
        return _arrayImageBlobController.deleteArrayImage();

      case types.ADD_ARRAY_IMAGE:
        return _arrayImageBlobController.addArrayImage();

      case types.UPDATE_ARRAY_IMAGE:
        return _arrayImageBlobController.updateArrayImage();

      case types.SET_ARRAY_IMAGE:
        return _arrayImageBlobController.setArrayImage();

      default:
        return state;
    }
  };

  return inspection()


}
export default WidgetBlocks;

