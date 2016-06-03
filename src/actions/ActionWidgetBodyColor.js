/**
 * Created by Anton.Filin on 24.03.2016.
 */
'use strict';

import * as types from '../constants/ActionTypes';

const setBodyColorUnsafe = (id, hex) => {
  return {
    type: types.SET_BODY_COLOR,
    id: id,
    color: hex
  }

};
export const setBodyColor = (id, hex) => {
  return (dispatch)=> {
    var isOk = /^#[0-9A-F]{6}$/i.test(hex);
    if (isOk) {
      dispatch(setBodyColorUnsafe(id, hex));
    } else {
      // error
    }
  }
};
