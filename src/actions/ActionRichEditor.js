/**
 * Created by Anton.Filin on 04.04.2016.
 */

import * as types from '../constants/ActionTypes';

const saveRangeUnsafe = (elem)=> {
  return {
    type: types.SAVE_RANGE,
    elem
  }
};

export const saveRange = (elem) => {
  return (dispatch)=> {
    dispatch(saveRangeUnsafe(elem));
  }
};

const getRangeUnsafe = ()=> {
  return {
    type: types.GET_RANGE
  }
};

export function getRange() {
  return (dispatch, getState)=> {
    const range = getState().EditorBlock.range;
    if (Object.keys(range)[0]) {
      dispatch(getRangeUnsafe());
    }
  }
}

const restoreRangeUnsafe = (elem, saveRange)=> {
  return {
    type: types.RESTORE_RANGE,
    elem,
    saveRange
  }
};

export const restoreRange = (elem, saveRange) => {
  return (dispatch)=> {
    dispatch(restoreRangeUnsafe(elem, saveRange));
  }
};

const saveElemUnsafe = (elem)=> {
  return {
    type: types.SAVE_ELEM,
    elem
  }
};

export const saveElem = (elem) => {
  return (dispatch)=> {
    dispatch(saveElemUnsafe(elem));
  }
};

const getElemUnsafe = (elem)=> {
  return {
    type: types.GET_ELEM,
    elem
  }
};

export const getElem = (elem) => {
  return (dispatch)=> {
    dispatch(getElemUnsafe(elem));
  }
};
