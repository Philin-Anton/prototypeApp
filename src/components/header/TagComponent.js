'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Icon from '../glyphicon/IndexComponent';

require('styles/header/Tag.scss');

class TagComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newTag: false,
      nameNewTag: ''
    };

    this.returnTag = this.returnTag.bind(this);
    this.newTags = this.newTags.bind(this);
    this.addTags = this.addTags.bind(this);
  }

  newTags(){
    this.setState()
  }
  addTags(){
    const nameTag = this.getState().nameNewTag;
    window.console.log(nameTag);
  }
  deleteTags(/*id*/){

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
        <input type="text" value={this.state.nameNewTag} />
        <bottom onClick={this.addTags}>Add Tag</bottom>
      </div>
    )
  }

  render() {
    return (
      <div className="tag-component">
        <div className="add-tags" onClick={this.newTags.bind(this)}>
          <Icon glyph="tag"/>
          { this.state.newTag ?  returnNewTag() : null}
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

const getTags = state => state.WidgetBlocks.tags ? state.WidgetBlocks.tags : {tags: [{id: 0, name:'asdasd'}]};

const select = createSelector([getTags], tags => {
  return tags;
});

export default connect(select)(TagComponent);
