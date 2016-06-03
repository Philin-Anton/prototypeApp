/**
 * Created by Anton.Filin on 24.03.2016.
 */
'use strict';


import * as types from '../constants/ActionTypes';

const checkWidgetBlockUnsafe = (elem)=> {
  return {
    type: types.CHECK_WIDGET_BLOCKS,
    elem
  }
};

export const checkWidgetBlock = (elem) => {
  return (dispatch)=> {
    dispatch(checkWidgetBlockUnsafe(elem));
  }
};

const setWidgetBlockUnsafe = (array)=> {
  return {
    type: types.SET_WIDGET_BLOCKS,
    array
  }
};

export const setWidgetBlock = (array) => {
  return (dispatch)=> {
    dispatch(setWidgetBlockUnsafe(array));
  }
};

const addWidgetBlockUnsafe = (content)=> {
  return {
    type: types.ADD_WIDGET_BLOCKS,
    content
  }
};

export const addWidgetBlock = (content) => {
  return (dispatch)=> {
    dispatch(addWidgetBlockUnsafe(content));
  }
};

const reorderWidgetBlockUnsafe = (currentIndex, afterIndex, newBlock)=> {
  return {
    type: types.REORDER_WIDGET_BLOCKS,
    currentIndex,
    afterIndex,
    newBlock
  }
};
export const reorderWidgetBlock = (currentIndex, afterIndex, newBlock) => {
  return (dispatch)=> {
    dispatch(reorderWidgetBlockUnsafe(currentIndex, afterIndex, newBlock));
  }
};

const deleteWidgetBlockUnsafe = (id)=> {
  return {
    type: types.REMOVE_WIDGET_BLOCKS,
    id
  }
};

export const deleteWidgetBlock = (id) => {
  return (dispatch)=> {
    dispatch(deleteWidgetBlockUnsafe(id));
  }
};

const updateWidgetBlockUnsafe = (newBlock)=> {
  return {
    type: types.UPDATE_WIDGET_BLOCKS,
    newBlock
  }
};

export const updateWidgetBlock = (newBlock) => {
  return (dispatch)=> {
    dispatch(updateWidgetBlockUnsafe(newBlock));
  }
};
