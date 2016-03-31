/**
 * @author Anton.Filin
 */
import update from 'react/lib/update';
import classnames from 'classnames';


export const setLocalStore = (store, nameStore) => {
  const storeJSON = JSON.stringify(store);
  const nameStorage = nameStore || 'MagooStore';

  localStorage.setItem(nameStorage, storeJSON);
  return store;
};

export const getLocalStore = (nameStore) => {
  const nameStorage = nameStore || 'MagooStore';
  const storeJSON = localStorage.getItem(nameStorage);
  return JSON.parse(storeJSON)
};

export const drawFrame = (state) => {
  return (updateFn) => {
    const nextState = update(state, updateFn);
    return nextState;
  };
  //import {setLocalStore} from '../api/maggo';
  //setLocalStore(store.getState().WidgetBlocks);
};

export const classNames = (classes) => {
  return classnames(classes);
};

export const throttle = (func, ms) => {
  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};
