'use strict';

import React from 'react';
import FileInput from 'react-file-input';
import FileDrop  from 'react-file-drop';

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {drawFrame} from '../api/maggo';

import { actionPopUpBlock } from '../actions/index';

const setImagePopUp = actionPopUpBlock.setImagePopUp;
const changeStepPopUp = actionPopUpBlock.changeStepPopUp;
const changeTitlePopUp = actionPopUpBlock.changeTitlePopUp;

require('styles/Controls.scss');
require('styles/FileChoose.scss');


class FileChooseComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state={
      error: false
    };

    this.drawFrame = drawFrame(this.state);
  }

  nextStep(uri){
    const path = window.URL.createObjectURL(uri[0]);
    const {changeStepPopUp, changeTitlePopUp, setImagePopUp} = this.props;
    changeStepPopUp('edit-img');
    changeTitlePopUp('Edit Photo');
    setImagePopUp(path);
  }

  handleChange(event) {
    if(!this.handleError.call(this, event.target.files)){
      this.nextStep(event.target.files);
    }
  }

  handleFileDrop(files/*, event*/) {
    if(!this.handleError.call(this, files)){
      this.nextStep(files);
    }
  }
  handleError(files){
    if(!(files && files[0] && files[0].type)) return false;
    const isError = files[0].type.indexOf('image') != -1;
    const nextState = this.drawFrame({
      error:{
        $set: !isError
      }
    });
    this.setState(nextState);
    return !isError

  }
  renderError(){
    return(
      <div className="error">
        Sorry. This format does not support upload.
      </div>
    )
  }
  render() {
    const {error} = this.state;
    const {text} = this.props;
    return (
      <div className="filechoose-component">
        <div className="file-input">
          <div className="pseudo-link">Change image</div>
          <FileInput name="myImage"
                     accept=".png,.gif,.jpg"
                     placeholder={text|| 'Choose image...'}
                     className="inputClass"
                     onChange={this.handleChange.bind(this)}/>
          {
            error ? this.renderError() : null
          }
        </div>
        <FileDrop frame={document} onDrop={this.handleFileDrop.bind(this)}>
          Drop some files here!
        </FileDrop>
      </div>
    );
  }

}

FileChooseComponent.displayName = 'FileChooseComponent';

 //Uncomment properties you need
 //FileChooseComponent.propTypes = {};
 //FileChooseComponent.defaultProps = {};

const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getWidgetBlocksState], (widgetBlocks) => {
  return {widgetBlocks};
});

export default connect(select,
  {
    setImagePopUp,
    changeStepPopUp,
    changeTitlePopUp
  }
)(FileChooseComponent);
