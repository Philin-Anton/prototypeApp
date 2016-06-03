class arrayImageBlobController {

  constructor(state, action, _drawFrame){
        this.state = state;
        this.action = action;
        this.drawFrame = _drawFrame;
  }
  setArrayImage(){
    return this.drawFrame({
      arrayImage: {
        $set: this.action.array
      }
    });
  }

  deleteArrayImage(){
    return this.drawFrame({
      arrayImage: {
        $splice: [[this.action.index, 1]]
      }
    });
  }
  addArrayImage(){
    return this.drawFrame({
      arrayImage: {
        $push: [this.action.object]
      }
    });
  }
  updateArrayImage(){
    return this.drawFrame({
      arrayImage: {
        $splice: [
          [this.action.index, 1, this.action.object]
        ]
      }
    });
  }

}

export default arrayImageBlobController;
