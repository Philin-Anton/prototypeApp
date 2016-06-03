
import _tagController from './tagController'
import _forSalesController from './forSalesController'
import _titleController from './titleController'
import _bodyColorController from './bodyColorController'
import _listBlockController from './listBlockController'
import _blockController from './blockController'
import _editorController from './editorController'
import _popUpController from './popUpController'
import _arrayImageBlobController from './arrayImageBlobController'


export const tagController = (state, action, _drawFrame) => {
  return  new _tagController( state, action, _drawFrame);
};

export const forSalesController = (state, action, _drawFrame) => {
  return  new _forSalesController( state, action, _drawFrame);
};

export const titleController = (state, action, _drawFrame) => {
  return  new _titleController( state, action, _drawFrame);
};

export const bodyColorController = (state, action, _drawFrame) => {
  return  new _bodyColorController( state, action, _drawFrame);
};

export const listBlockController = (state, action, _drawFrame) => {
  return  new _listBlockController( state, action, _drawFrame);
};

export const blockController = (state, action, _drawFrame) => {
  return  new _blockController( state, action, _drawFrame);
};
export const editorController = (state, action, _drawFrame) => {
  return  new _editorController( state, action, _drawFrame);
};
export const popUpController = (state, action, _drawFrame) => {
  return  new _popUpController( state, action, _drawFrame);
};
export const arrayImageBlobController = (state, action, _drawFrame) => {
  return  new _arrayImageBlobController( state, action, _drawFrame);
};
