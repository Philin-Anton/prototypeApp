'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

require('styles/ActionIcons.scss');
require('styles/navBar/More.scss');
import {getContent, clearLocalStore} from '../../api/maggo';
import {handleSave, handlePublish, handleDelete} from '../../api/handlers';

import { actionWidgetList, actionWidgetTag, actionWidgetTitle, actionArrayImageBlob} from '../../actions/index';
const setTitle =  actionWidgetTitle.setTitle;
const addToTag = actionWidgetTag.addToTag;
const setArrayImage = actionArrayImageBlob.setArrayImage;
const setWidgetBlock = actionWidgetList.setWidgetBlock;

class MoreComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  savedContent(){
    const {widgetBlocks, selectionMore} = this.props;
    const goOutJSON = JSON.stringify(getContent(widgetBlocks));
    clearLocalStore();
    selectionMore();
    return goOutJSON
  }
  save(){
    const goOutJSON = this.savedContent.call(this);
    handleSave.call(this, goOutJSON);
  }
  publish(){
    const goOutJSON = this.savedContent.call(this);
    handlePublish.call(this, goOutJSON);
  }
  remove(){
    const {setWidgetBlock, addToTag, setTitle, setArrayImage, selectionMore} = this.props;
    setTitle('');
    addToTag('');
    setArrayImage([]);
    setWidgetBlock([]);
    handleDelete.call(this);
    selectionMore();
  }
  render() {
    return (
      <div className="more-component">
        <ul>
          <li onClick={this.save.bind(this)}>
            <span className="action-icon action-icon-save"></span>
            <span>Save</span>
          </li>
          <li onClick={this.publish.bind(this)}>
            <span className="action-icon action-icon-publish"></span>
            <span>Publish</span>
          </li>
          <li onClick={this.remove.bind(this)}>
            <span className="action-icon action-icon-remove"></span>
            <span>Delete</span>
          </li>
        </ul>
      </div>
    );
  }
}

MoreComponent.displayName = 'NavBarMoreComponent';

// Uncomment properties you need
// MoreComponent.propTypes = {};
// MoreComponent.defaultProps = {};
const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getWidgetBlocksState], (widgetBlocks) => {
  return {widgetBlocks};
});

export default connect(select,{setWidgetBlock, addToTag, setTitle, setArrayImage}
)(MoreComponent);
