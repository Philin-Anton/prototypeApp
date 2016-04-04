/**
 * Created by Anton.Filin on 04.04.2016.
 */

import * as types from '../constants/ActionTypes';

const saveRangeUnsafe = (range)=> {
  return {
    type: types.SAVE_RANGE,
    range
  }
};

export const saveRange = (range) => {
  return (dispatch)=> {
    dispatch(saveRangeUnsafe(range));
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
