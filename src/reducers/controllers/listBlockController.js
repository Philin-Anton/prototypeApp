import {getElem, getIndex} from '../../api/maggo';

class listController {

  constructor(state, action, _drawFrame) {
    this.state = state;
    this.action = action;
    this.drawFrame = _drawFrame;
  }

  setWidgetBlock() {
    return this.drawFrame({
      widgetsByIndex: {
        $set: this.action.array
      }
    });
  }

  deleteBlocks() {
    const widgetsByIndex = this.state.widgetsByIndex;

    const elem = getElem(widgetsByIndex, this.action.id);
    const index = getIndex(widgetsByIndex, elem);

    return this.drawFrame({
      widgetsByIndex: {
        $splice: [[index, 1]]
      }
    });
  }

  addBlocks() {
    return this.drawFrame({
      widgetsByIndex: {
        $push: [
          this.action.content
        ]
      }
    });
  }

  reorderBlocks() {
    return this.drawFrame({
      widgetsByIndex: {
        $splice: [
          [this.action.currentIndex, 1],
          [this.action.afterIndex, 0, this.action.newBlock]
        ]
      }
    });
  }

  checkBlock() {
    return this.drawFrame({
      checkWidget: {
        $set: this.action.elem
      }
    });
  }

  updateBlock() {
    const widgetsByIndex = this.state.widgetsByIndex;
    const elem = getElem(widgetsByIndex, this.action.newBlock.id);
    const index = getIndex(widgetsByIndex, elem);

    return this.drawFrame({
      widgetsByIndex: {
        $splice: [
          [index, 1, this.action.newBlock]
        ]
      }
    });
  }

}

export default listController;
