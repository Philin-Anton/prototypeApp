/**
 * @author Anton.Filin
 */

class blockController {

  constructor(state, action, _drawFrame){
        this.state = state;
        this.action = action;
        this.drawFrame = _drawFrame;
  }

  createEditors(){
    const widgetsByIndex = this.state.widgetsByIndex;
    const index = this.action.index;

    const editElem = widgetsByIndex[index];
    let newEditor = {};

    if(!!editElem.edit){
      const lastKey = editElem.edit.length;
      newEditor.id = lastKey;
      newEditor.content = [];
      editElem.edit.push(newEditor);
    }else{
      newEditor.id = 0;
      newEditor.content = [];
      editElem.edit = [];
      editElem.edit.push(newEditor);
    }

    window.console.log(newEditor, 'newEditor');
    window.console.log(widgetsByIndex, 'widgetsByIndex');
    //return this.state;
    return this.drawFrame({
      widgetsByIndex: {
        $splice: [[index, 1, widgetsByIndex[index]]]
      }
    });
  }
}

export default blockController;
