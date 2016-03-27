'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
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
  }

  newTags(){
    const nextState = this.drawFrame({
      $set:{
        newTag: true
      }
    });
    this.setState(nextState);
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
    ReactDOM.findDOMNode(this.refs.inputNewTag).focus();
  }

  closePopup(){
    if(!this.state.newTag) return;

    const nextState = this.drawFrame({
      $set:{
        newTag: false
      }
    });
    this.setState(nextState);
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

  renderTag(tag){
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

  renderPopUp(){
    return (
    <div>
      <div className="popup-new-tag">
        <input type="text" ref="inputNewTag" value={this.state.nameNewTag} onChange={this.onChange.bind(this)} />
        <button onClick={this.addTags.bind(this)}>Add Tag</button>
        <div className="close-popup-new-tag" onClick={this.closePopup.bind(this)}>
          <Icon glyph="remove"/>
        </div>
      </div>
      <div className="background-new-tag" onClick={this.closePopup.bind(this)}></div>
    </div>
    )
  }
  componentWillMount(){
    window.addEventListener('scroll', this.closePopup.bind(this));
    window.addEventListener('resize', this.closePopup.bind(this));
  }

  render() {
    return (
      <div className="tag-component">
        <div className="add-tags" onClick={this.newTags.bind(this)}>
          <Icon glyph="tag"/>
        </div>
        <div className="return-tags">
          {
            this.props.tags.map(tag => (
              this.renderTag(tag)
            ))
          }
        </div>
         { this.state.newTag ?  this.renderPopUp.call(this) : null}
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
