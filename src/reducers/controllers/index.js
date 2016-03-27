/**
 * @author Anton.Filin
 */

import _tagController from './tagController'
import _forSalesController from './forSalesController'
import _titleController from './titleController'


export const tagController = (state, action, _drawFrame) => {
  return  new _tagController( state, action, _drawFrame);
};

export const forSalesController = (state, action, _drawFrame) => {
  return  new _forSalesController( state, action, _drawFrame);
};

export const titleController = (state, action, _drawFrame) => {
  return  new _titleController( state, action, _drawFrame);
};
