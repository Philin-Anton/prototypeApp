/**
 * Created by Anton.Filin on 24.03.2016.
 */
'use strict';

export const ADD_WIDGET_BLOCKS = 'ADD_WIDGET_BLOCKS';
export const REMOVE_WIDGET_BLOCKS = 'REMOVE_WIDGET_BLOCKS';
export const REORDER_WIDGET_BLOCKS = 'REORDER_WIDGET_BLOCKS';



export const ADD_TAG = (text) => {
  return {
    type: 'ADD_TAG',
    name: text
  }
};

export const DELETE_TAG = (id) => {
  return {
    type: 'DELETE_TAG',
    id: id
  }
};
