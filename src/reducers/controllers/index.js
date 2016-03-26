/**
 * @author Anton.Filin
 */

import _tagController from './tagController'


export const tagController = (state, action, _drawFrame) => {
  return  new _tagController( state, action, _drawFrame);
};
