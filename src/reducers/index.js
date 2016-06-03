import WidgetBlocks from './WidgetBlocks';
import EditorBlock from './EditorBlock';
import PopUpBlock from './PopUpBlock';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
let reducer = combineReducers({ WidgetBlocks, EditorBlock, PopUpBlock });

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ];

let store = createStore(
  reducer,
  applyMiddleware(...middleware)
);
export default store;
