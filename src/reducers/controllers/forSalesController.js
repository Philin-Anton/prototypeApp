
class forSalesController {

  constructor(state, action, _drawFrame) {
    this.state = state;
    this.action = action;
    this.drawFrame = _drawFrame;
  }

  changeForSales() {
    const valueForSales = this.state.forSales ? false : true;

    return this.drawFrame({
      forSales: {
        $set: valueForSales
      }
    });
  }

  getForSales() {
    return this.state.getState();
  }

}

export default forSalesController;
