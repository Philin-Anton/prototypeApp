/**
 * Created by Anton.Filin on 24.03.2016.
 */

import * as types from '../constants/ActionTypes';

const setArrayImageUnsafe = (array) => {
  return {
    type: types.SET_ARRAY_IMAGE,
    array
  }
};

export function setArrayImage(array) {
  return (dispatch)=> {
    dispatch(setArrayImageUnsafe(array));
  }
}

const deleteArrayImageUnsafe = (index) => {
  return {
    type: types.DELETE_ARRAY_IMAGE,
    index: index
  }
};

export function deleteArrayImage(index) {
  return (dispatch)=> {
    dispatch(deleteArrayImageUnsafe(index));
  }
}

const addArrayImageUnsafe = (object) => {
  return {
    type: types.ADD_ARRAY_IMAGE,
    object: object
  }
};

export function addArrayImage(object) {
  return (dispatch)=> {
    dispatch(addArrayImageUnsafe(object));
  }
}

const updateArrayImageUnsafe = (index, object) => {
  return {
    type: types.UPDATE_ARRAY_IMAGE,
    index: index,
    object: object
  }
};

export function updateArrayImage(index, object) {
  return (dispatch)=> {
    dispatch(updateArrayImageUnsafe(index, object));
  }
}

