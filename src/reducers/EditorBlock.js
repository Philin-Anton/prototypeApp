import * as types from '../constants/ActionTypes';
import {drawFrame } from '../api/maggo';
import { editorController } from './controllers/index';

const InitState = {
    range:{},
    typeCursor:''
};

function EditorBlock(state = InitState, action){

  const _drawFrame = drawFrame(state);
  const _editorController = editorController(state, action, _drawFrame);

  const inspection = function(){
    switch (action.type) {

      case types.DELETE_RANGE:
        return _editorController.deleteRange();

      case types.SAVE_RANGE:
        return _editorController.saveRange();

      case types.GET_RANGE:
        return _editorController.getRange();

      case types.SAVE_ELEM:
        return _editorController.saveElem();

      case types.GET_ELEM:
        return _editorController.getElem();

      case types.RESTORE_RANGE:
        return _editorController.restoreRange();

      case types.SET_TYPE_CURSOR:
        return _editorController.setTypeCursor();

      default:
        return state;
    }
  };

  return inspection();

}
export default EditorBlock;

