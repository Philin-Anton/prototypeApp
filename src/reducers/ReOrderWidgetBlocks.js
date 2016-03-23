/**
 * Created by Anton.Filin on 23.03.2016.
 */
export default class ReOrderWidgetBlocks {
  constructor(state, action){
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
      default:
        return state
    }
  }
}
