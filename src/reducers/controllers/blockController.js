class blockController {

  constructor(state, action, _drawFrame) {
    this.state = state;
    this.action = action;
    this.drawFrame = _drawFrame;
  }

  addHtml() {
    const widgetsByIndex = this.state.widgetsByIndex;
    const id = this.action.id;
    const elem = widgetsByIndex.filter(item => {
      return item.id == id
    })[0];

    const index = widgetsByIndex.findIndex(item => {
      return JSON.stringify(item) == JSON.stringify(elem);
    });
    elem.html = this.action.html;

    return this.drawFrame({
      widgetsByIndex: {
        $splice: [[index, 1, elem]]
      }
    });
  }
}

export default blockController;
