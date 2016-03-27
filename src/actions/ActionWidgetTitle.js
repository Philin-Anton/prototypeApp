/**
 * Created by Anton.Filin on 24.03.2016.
 */

import * as types from '../constants/ActionTypes';

const setTitleUnsafe = (text) => {
  return {
    type: types.SET_TITLE,
    title: text
  }
};
export const setTitle = (text) => {
  return (dispatch) => {
    dispatch(setTitleUnsafe(text));
  }
};
