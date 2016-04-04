/**
 * @author Anton.Filin
 */

class editorController {

  constructor(state, action, _drawFrame){
        this.state = state;
        this.action = action;
        this.drawFrame = _drawFrame;
  }

  saveRange(){
    return this.drawFrame({
      range: {
        $set: [
          this.action.range
        ]
      }
    });
  }
  getRange(){
    return this.state.getState();
  }

}

export default editorController;
