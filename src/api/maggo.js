/**
 * @author Anton.Filin
 */
import update from 'react/lib/update';
import classnames from 'classnames';


export const drawFrame = (state) => {

  return (updateFn) => {
    const nextState = update(state, updateFn);
    window.console.log(nextState);
    return nextState;
  }
};

export const classNames = (classes) => {
  return classnames(classes);
};

export const throttle = (func, ms) => {
  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};
