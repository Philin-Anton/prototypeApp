/**
 * Created by Anton.Filin on 24.03.2016.
 */
'use strict';


import * as types from '../constants/ActionTypes';

const addWidgetBlockUnsafe = (id, block)=> {
  return {
    type: types.ADD_WIDGET_BLOCKS,
    id,
    block
  }
};

export const addWidgetBlock = (id, block) => {
  return (dispatch)=> {
    dispatch(addWidgetBlockUnsafe(id, block));
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
