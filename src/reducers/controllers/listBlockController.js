/**
 * @author Anton.Filin
 */

class listController {

  constructor(state, action, _drawFrame){
        this.state = state;
        this.action = action;
        this.drawFrame = _drawFrame;
  }

  deleteBlocks(){
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
  addBlocks(){
    const newTAG = {
      id: this.action.id,
      block: this.action.block
    };

    return this.drawFrame({
        widgetsById: {
          $set: newTAG.id
        },
        widgetsByIndex: {
          $push: [
            newTAG.block
          ]
        }
    });
  }
  reorderBlocks(){
    return this.drawFrame({
      widgetsByIndex: {
        $splice: [
          [this.action.currentIndex, 1],
          [this.action.afterIndex, 0, this.action.newBlock]
        ]
      }
    });

    //return this.state.getState();
  }

}

export default listController;
