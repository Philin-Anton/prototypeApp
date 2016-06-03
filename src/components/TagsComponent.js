'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

//var ReactTags = require('react-tag-input').WithOutContext;
import { WithOutContext as ReactTags } from 'react-tag-input';

import {getDefaultManager, drawFrame, throttle} from '../api/maggo';

import { actionWidgetTag } from '../actions/index';

const addToTag = actionWidgetTag.addToTag;

require('styles//Tags.scss');

class TagsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    const {widgetBlocks} = props;
    const {tags} = widgetBlocks;

    let immutableTags = [];
    if(tags){
      immutableTags = tags.split(', ').map((item, index, arr) => ({
        id: index,
        text: arr.length-1 == index ? item : item+','
      }));
    }

    this.state = {
      tags: immutableTags,
      suggestions: ['']
    };

    this.throttleHandleDrag = throttle(this.handleDrag.bind(this), 400);
  }

  saveTags(objectTags){
    const {addToTag} = this.props;
    const arrTags = objectTags.tags.map(item=>(item.text.substring(0, item.text.length - 1)));
    const stringTag = arrTags.join(', ');
    addToTag(stringTag)
  }

  handleDelete(i) {
    const state = this.state;
    let prevTags = null;
    if(i == state.tags.length-1 && state.tags.length-1 !=0){
      prevTags = state.tags[i-1];
      prevTags.text = prevTags.text.substring(0, prevTags.text.length - 1);
    }
    const nextState = drawFrame(state)({
      tags: {
        $splice: prevTags ? [[i, 1],[i-1, 1, prevTags]] : [[i, 1],[0,0]]
      }
    });
    this.setState(nextState);
    this.saveTags.call(this, nextState);
  }
  handleAddition(tag) {
    const state = this.state;
    const tags = state.tags;
    let prevTags = null;
    if(tags.length){
      prevTags = tags[tags.length-1];
      prevTags.text = prevTags.text+',';
    }

    const nextState = drawFrame(state)({
      tags: {
        $splice: prevTags ? [[tags.length-1, 1, prevTags]] : [[0,0]],
        $push: [{
          id: tags.length + 1,
          text: tag
        }]
      }
    });

    this.setState(nextState);
    this.saveTags.call(this, nextState);
  }
  handleDrag(/*tag, currPos, newPos*/) {
    return false;

    //const state = this.state;
    //
    //const nextState = drawFrame(state)({
    //  tags: {
    //    $splice: [[currPos, 1], [newPos, 0, tag]]
    //  }
    //});
    //
    //this.setState(nextState);
    //this.saveTags.call(this, nextState);
  }

  render() {
    const {tags, suggestions} = this.state;
    return (
      <div className="tags-component">
        <ReactTags tags={tags}
                   autofocus={false}
                   suggestions={suggestions}
                   handleDelete={this.handleDelete.bind(this)}
                   handleAddition={this.handleAddition.bind(this)}
                   handleDrag={this.throttleHandleDrag.bind(this)}/>
      </div>
    );
  }
}

TagsComponent.displayName = 'TagsComponent';

// Uncomment properties you need
// TagsComponent.propTypes = {};
// TagsComponent.defaultProps = {};

const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getWidgetBlocksState], (widgetBlocks) => {
  return {widgetBlocks};
});

//const Backend = !!(md.mobile()|| md.phone() || md.tablet())? TouchBackend : HTML5Backend;

export default connect(select, {addToTag})(getDefaultManager()(TagsComponent));
