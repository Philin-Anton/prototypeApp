'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { actionWidgetTag} from '../../actions/index';
const getAllTags =  actionWidgetTag.getAllTags;
const addToTag =  actionWidgetTag.addToTag;
const deleteToTag =  actionWidgetTag.deleteToTag;

import Icon from '../glyphicon/IndexComponent';

import {drawFrame} from '../../api/maggo';

require('styles/header/Tag.scss');

class TagComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newTag: false,
      nameNewTag: ''
    };
    this.drawFrame = drawFrame(this.state);

    this.returnTag = this.returnTag.bind(this);
    this.newTags = this.newTags.bind(this);
  }

  newTags(){
    const nextState = this.drawFrame({
      $set:{
        newTag: true
      }
    });
    this.setState(nextState);
    //this.refs.inputNewTag.getDOMNode().focus()
  }
  addTags(){
    const nameTag = this.state.nameNewTag;
    this.props.addToTag(nameTag);
    const nextState = this.drawFrame({
      $set:{
        nameNewTag: ''
      }
    });
    this.setState(nextState);
    this.refs.inputNewTag.getDOMNode().focus();
    window.console.log(this);
  }
  deleteTags(id){
    this.props.deleteToTag(id);
  }

  onChange(event){
    const nextState = this.drawFrame({
      $set:{
        nameNewTag: event.target.value
      }
    });
    this.setState(nextState);
  }

  returnTag(tag){
    return (
      <div className="return-tag" key={tag.id}>
        <span>
          {tag.name}
        </span>
        <div className="remove-tag" onClick={this.deleteTags.bind(this, tag.id)}>
          <Icon glyph="remove"/>
        </div>
      </div>
    )
  }

  returnNewTag(){
    return (
      <div className="return-tag">
        <input type="text" ref="inputNewTag"  value={this.state.nameNewTag} onChange={this.onChange.bind(this)} />
        <bottom onClick={this.addTags.bind(this)}>Add Tag</bottom>
      </div>
    )
  }

  render() {
    return (
      <div className="tag-component">
        <div className="add-tags" onClick={this.newTags.bind(this)}>
          <Icon glyph="tag"/>
          { this.state.newTag ?  this.returnNewTag.bind(this)() : null}
        </div>
        <div className="return-tags">
          {
            this.props.tags.map(tag => (
              this.returnTag(tag)
            ))
          }
        </div>
      </div>

    );
  }
}

TagComponent.displayName = 'HeaderTagComponent';

// Uncomment properties you need
//TagComponent.propTypes = {
//  tags:
//};
// TagComponent.defaultProps = {};

const getAllState = state => state.WidgetBlocks;

const select = createSelector([getAllState], state => {
  return state;
});

export default connect(select, {deleteToTag, getAllTags, addToTag})(TagComponent);
