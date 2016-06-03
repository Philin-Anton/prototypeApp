
import * as types from '../constants/ActionTypes';
import {drawFrame} from '../api/maggo';
import { popUpController } from './controllers/index';

const InitState = {
    open: false,
    step: null
};

function PopUpBlock(state = InitState, action){

  const _drawFrame = drawFrame(state);
  const _popUpController = popUpController(state, action, _drawFrame);

  const inspection = function(){
    switch (action.type) {

      case types.OPEN_POPUP:
        return _popUpController.openPopUp();

      case types.CLOSE_POPUP:
        return _popUpController.closePopUp();

      case types.CHANGE_STEP_POPUP:
        return _popUpController.changeStepPopUp();

      case types.CHANGE_TITLE_POPUP:
        return _popUpController.changeTitlePopUp();

      case types.SET_IMAGE_POPUP:
        return _popUpController.setImagePopUp();

      default:
        return state;
    }
  };

  return inspection();

}
export default PopUpBlock;

