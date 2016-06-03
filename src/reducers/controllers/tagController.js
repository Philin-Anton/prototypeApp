
class tagController {

  constructor(state, action, _drawFrame){
        this.state = state;
        this.action = action;
        this.drawFrame = _drawFrame;
  }

  addTag(){
    return this.drawFrame({
      tags: {
        $set: this.action.tags
      }
    });
  }
}

export default tagController;
