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
    window.console.log(JSON.stringify(this.action.range));
    window.console.log(this.action.range);

    const range = Object.assign({}, this.action.range);
    window.console.log(range);
    return this.drawFrame({
      range: {
        $set: JSON.stringify(this.action.range)
      }
    });
  }
  getRange(){
    return this.state.range;
  }

}

export default editorController;
