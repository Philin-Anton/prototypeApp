/**
 * Created by Anton.Filin on 23.03.2016.
 */

import * as types from '../constants/ActionTypes';
import {drawFrame, getLocalStore, setLocalStore} from '../api/maggo';
import { editorController } from './controllers/index';

const InitState = getLocalStore('EditorBlock') || {
    range:{},
    type:''
};

function EditorBlock(state = InitState, action){

  const _drawFrame = drawFrame(state);
  const _editorController = editorController(state, action, _drawFrame);

  const inspection = function(){
    switch (action.type) {
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
      default:
        return state;
    }
  };

  const returnState = inspection();
  setLocalStore(returnState, 'EditorBlock');
  return returnState

}
export default EditorBlock;

