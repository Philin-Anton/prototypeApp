/**
 * @author Anton.Filin
 */
import update from 'react/lib/update';

export const drawFrame = (state) => {

  return (updateFn) => {
    const nextState = update(state, updateFn);
    window.console.log(nextState);
    return nextState;
  }

};
