/**
 * Created by Anton.Filin on 24.03.2016.
 */

import * as types from '../constants/ActionTypes';

const addToTagUnsafe = (tags) => {
  return {
    type: types.ADD_TAG,
    tags
  }
};

export const addToTag = (tags) => {
  return (dispatch) => {
    dispatch(addToTagUnsafe(tags));
  }
};

