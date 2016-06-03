
class popUpController {

  constructor(state, action, _drawFrame){
    this.state = state;
    this.action = action;
    this.drawFrame = _drawFrame;
  }

  openPopUp(){
    return this.drawFrame({
      open: {
        $set: this.action.state
      }
    });
  }
  closePopUp(){
    return this.drawFrame({
      open: {
        $set: this.action.state
      }
    });
  }
  changeStepPopUp(){
    return this.drawFrame({
      step: {
        $set: this.action.step
      }
    });
  }
  changeTitlePopUp(){
    return this.drawFrame({
      title: {
        $set: this.action.title
      }
    });
  }
  setImagePopUp(){
    return this.drawFrame({
      image: {
        $set: this.action.image
      }
    });
  }

}
export default popUpController;
