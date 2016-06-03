'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

require('styles//ImageBlock.scss');

class ImageBlockComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getFullImgContent(){
    const {html, widgetBlocks} = this.props;
    const {arrayImage} = widgetBlocks;
    const DIV = document.createElement('div');
    DIV.innerHTML = html;
    const figure = DIV.childNodes[0];
    const img = figure.childNodes[0].childNodes[0];
    const src = img.src.split('/').filter((item, index, arr) => {
      if(arr.length-1 === index){
        return item
      }
    });
    const imgPath = arrayImage[window.JSON.parse(decodeURI(src))[0]].image;
    img.src = imgPath;
    return DIV.innerHTML
  }

  render() {
    return (
      <div className="imageblock-component" dangerouslySetInnerHTML={{ __html: this.getFullImgContent.call(this) }}/>
    );
  }
}

ImageBlockComponent.displayName = 'ImageBlockComponent';

// Uncomment properties you need
// ImageBlockComponent.propTypes = {};
// ImageBlockComponent.defaultProps = {};

const getWidgetBlocksState = state => state.WidgetBlocks;

const select = createSelector([getWidgetBlocksState], (widgetBlocks) => {
  return {widgetBlocks};
});

export default connect(select,{}
)(ImageBlockComponent);

