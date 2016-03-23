/**
 * Created by Anton.Filin on 23.03.2016.
 */
import ReOrderWidget from './ReOrderWidgetBlocks'


import { combineReducers, createStore } from 'redux'
let reducer = combineReducers({ ReOrderWidget });
let store = createStore(reducer);


export default store;
