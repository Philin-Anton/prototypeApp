'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

require('styles/ActionIcons.scss');
require('styles/header/MoreMenu.scss');

import { getContent, clearLocalStore} from '../../api/maggo';
import {handleSave, handlePublish, handleDelete} from '../../api/handlers';

import { actionWidgetList, actionWidgetTag, actionWidgetTitle, actionArrayImageBlob} from '../../actions/index';
const setTitle = actionWidgetTitle.setTitle;
const addToTag = actionWidgetTag.addToTag;
const setArrayImage = actionArrayImageBlob.setArrayImage;
const setWidgetBlock = actionWidgetList.setWidgetBlock;

class MoreMenuComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  savedContent() {
    const {widgetBlocks} = this.props;
    const goOutJSON = JSON.stringify(getContent(widgetBlocks));
    clearLocalStore();
    return goOutJSON
  }

  save() {
    const goOutJSON = this.savedContent.call(this);
    handleSave.call(this, goOutJSON);
  }

  publish() {
    const goOutJSON = this.savedContent.call(this);
    handlePublish.call(this, goOutJSON);
  }

  remove() {
    const {setWidgetBlock, addToTag, setTitle, setArrayImage} = this.props;
    setTitle('');
    addToTag('');
    setArrayImage([]);
    setWidgetBlock([]);
    handleDelete.call(this);
  }

  render() {
    return (
      <div className="moremenu-component">
        <ul className="fix-wrapper">
          <li onClick={this.save.bind(this)}>
            <span className="action-icon icon-style-dark action-icon-save"></span>
          </li>
          <li onClick={this.publish.bind(this)}>
            <span className="action-icon icon-style-dark action-icon-publish"></span>
          </li>
          <li onClick={this.remove.bind(this)}>
            <span className="action-icon icon-style-dark action-icon-remove"></span>
          </li>
        </ul>
      </div>
    );
  }
}

MoreMenuComponent.displayName = 'HeaderMoreMenuComponent';

// Uncomment properties you need
// MoreMenuComponent.propTypes = {};
// MoreMenuComponent.defaultProps = {};
const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getWidgetBlocksState], (widgetBlocks) => {
  return {widgetBlocks};
});

export default connect(select, {setWidgetBlock, addToTag, setTitle, setArrayImage}
)(MoreMenuComponent);
