/**
 * Created by Anton.Filin on 04.04.2016.
 */

import * as types from '../constants/ActionTypes';

const openPopUpUnsafe = (popUpState)=> {
  return {
    type: types.OPEN_POPUP,
    state: popUpState
  }
};

export const openPopUp = (popUpState) => {
  return (dispatch)=> {
    dispatch(openPopUpUnsafe(popUpState));
  }
};

const closePopUpUnsafe = (popUpState)=> {
  return {
    type: types.CLOSE_POPUP,
    state: popUpState
  }
};

export const closePopUp = (popUpState) => {
  return (dispatch)=> {
    dispatch(closePopUpUnsafe(popUpState));
  }
};

const changeStepPopUpUnsafe = (step)=> {
  return {
    type: types.CHANGE_STEP_POPUP,
    step
  }
};

export const changeStepPopUp = (step) => {
  return (dispatch)=> {
    dispatch(changeStepPopUpUnsafe(step));
  }
};

const changeTitlePopUpUnsafe = (title)=> {
  return {
    type: types.CHANGE_TITLE_POPUP,
    title
  }
};

export const changeTitlePopUp = (step) => {
  return (dispatch)=> {
    dispatch(changeTitlePopUpUnsafe(step));
  }
};
const setImagePopUpUnsafe = (image)=> {
  return {
    type: types.SET_IMAGE_POPUP,
    image
  }
};

export const setImagePopUp = (image) => {
  return (dispatch)=> {
    dispatch(setImagePopUpUnsafe(image));
  }
};

