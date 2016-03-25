'use strict';

import React from 'react';

require('styles/header/Title.scss');

class TitleComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getTitle = this.getTitle.bind();
  }

  getTitle(){
    if(this && this.prop){
      return this.prop.title ? this.prop.title : null;
    }else{
      return null;
    }
  }

  render() {
    return (
      <div className="title-component">
        <input type="text" value={this.getTitle()} placeholder="Title"/>
      </div>
    );
  }
}

TitleComponent.displayName = 'HeaderTitleComponent';

// Uncomment properties you need
// TitleComponent.propTypes = {};
// TitleComponent.defaultProps = {};

export default TitleComponent;
