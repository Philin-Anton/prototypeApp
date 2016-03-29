/**
 * Created by Anton.Filin on 24.03.2016.
 */
'use strict';


import * as types from '../constants/ActionTypes';

const createEditorsUnsafe = (index)=> {
  return {
    type: types.CREATE_EDITORS,
    index
  }
};

export const createEditors = (index) => {
  return (dispatch)=> {
    dispatch(createEditorsUnsafe(index));
  }
};
