/**
 * @author Anton.Filin
 */

class tagController {

  constructor(state, action, _drawFrame){
        this.state = state;
        this.action = action;
        this.drawFrame = _drawFrame;

    this.deleteTag = this.deleteTag.bind(this);
  }

  deleteTag(){
    const tags = this.state.tags;

    const elem = tags.filter(item => {
      return item.id == this.action.id
    })[0];

    const index = tags.findIndex(item => {
      return JSON.stringify(item) == JSON.stringify(elem);
    });

    return this.drawFrame({
      tags: {
        $splice: [[index, 1]]
      }
    });
  }
  addTag(){
    const newTAG = {
      id: this.action.id,
      name: this.action.name
    };

    return this.drawFrame({
      tags: {
        $push: [
          newTAG
        ]
      }
    });
  }
  getTags(){
    return this.state.getState();
  }

}

export default tagController;
