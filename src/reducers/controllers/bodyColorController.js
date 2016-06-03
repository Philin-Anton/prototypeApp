class bodyColorController {

  constructor(state, action, _drawFrame) {
    this.state = state;
    this.action = action;
    this.drawFrame = _drawFrame;
  }

  setBodyColor() {
    return this.drawFrame({
      bodyColor: {
        $set:{
          id: this.action.id,
          value: this.action.color
        }
      }
    });
  }
}

export default bodyColorController;
