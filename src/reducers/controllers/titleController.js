/**
 * @author Anton.Filin
 */

class titleController {

  constructor(state, action, _drawFrame) {
    this.state = state;
    this.action = action;
    this.drawFrame = _drawFrame;
  }

  setTitle() {
    return this.drawFrame({
      title: {
        $set: this.action.title
      }
    });
  }

  getTitle() {
    return this.state.getState();
  }

}

export default titleController;
