/**
 * @author Anton.Filin
 */

class editorController {

  constructor(state, action, _drawFrame){
        this.state = state;
        this.action = action;
        this.drawFrame = _drawFrame;
  }

  saveRange(){
    const containerEl = this.action.elem;
    let range, start;

    if (window.getSelection && document.createRange) {
      range = window.getSelection().getRangeAt(0);
      var preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(containerEl);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      start = preSelectionRange.toString().length;
    }else if (document.selection && document.body.createTextRange) {
      range = document.selection.createRange();
      var preSelectionTextRange = document.body.createTextRange();
      preSelectionTextRange.moveToElementText(containerEl);
      preSelectionTextRange.setEndPoint('EndToStart', range);
      start = preSelectionTextRange.text.length;
    }

    return this.drawFrame({
      range: {
        $set: {
          start: start,
          end: start + range.toString().length
        }
      },
      elem:{
        $set: containerEl.dataset.reactid
      }
    });
  }
  getRange(){
    return this.state.range;
  }
  saveElem(){
    return this.drawFrame({
      elem:{
        $set: this.action.elem.dataset.reactid
      }
    });
  }
  getElem(){
    const id = this.state.elem;
    return document.querySelector('[data-reactid="'+id+'"]');
  }

  restoreRange(){
    const containerEl = this.state.elem;
    const savedSel = this.state.saveRange;

    if (window.getSelection && document.createRange) {
      var charIndex = 0, range = document.createRange();
      range.setStart(containerEl, 0);
      range.collapse(true);
      var nodeStack = [containerEl], node, foundStart = false, stop = false;

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType == 3) {
          var nextCharIndex = charIndex + node.length;
          if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
            range.setStart(node, savedSel.start - charIndex);
            foundStart = true;
          }
          if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
            range.setEnd(node, savedSel.end - charIndex);
            stop = true;
          }
          charIndex = nextCharIndex;
        } else {
          var i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }

      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }else if (document.selection && document.body.createTextRange) {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(containerEl);
      textRange.collapse(true);
      textRange.moveEnd('character', savedSel.end);
      textRange.moveStart('character', savedSel.start);
      textRange.select();
    }
    return this.state
  }
}

export default editorController;
