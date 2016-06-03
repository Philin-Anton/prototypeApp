'use strict';

import React from 'react';

import {  classNames } from '../../api/maggo';

class TextMenuComponent extends React.Component {


  getELEMandVALUE(range){
    if(!(range && range.commonAncestorContainer && range.commonAncestorContainer.parentNode)) return false;
    const elem = range.commonAncestorContainer.nodeName == '#text'? range.commonAncestorContainer.parentNode: range.commonAncestorContainer;
    return ({
      elemName: elem.nodeName,
      value: elem.attributes[0] ? elem.attributes[0].value: ''
    });
  }
  render() {
    const {changeTEXT, range} = this.props;
    const currentELEM = this.getELEMandVALUE(range);
    let isP, isCenter;
    if(currentELEM && currentELEM.elemName){
      isP = currentELEM.elemName == 'P' ? true : false;
      isCenter = (currentELEM.value.indexOf('center') != -1) ? true: false;
    }else{
      isP = true;
      isCenter = false;
    }

    const classNameJustify  = classNames({
      'bottom-control': true,
      'active': isP && !isCenter
    });
    const classNameText  = classNames({
      'bottom-control': true,
      'active': !isP && isCenter
    });
    const classNameBlockquote  = classNames({
      'bottom-control': true,
      'active': !isP && !isCenter
    });
    const classNameCenter  = classNames({
      'bottom-control': true,
      'active': isP && isCenter
    });

    return (
      <div className="textmenu-component">
        <div className="fix-wrapper">
          <div className={classNameJustify} onClick={changeTEXT.call(this, 'justify')} >
            <span className="custom-icon custom-icon-align-justify"></span>
          </div>
          <div className={classNameText} onClick={changeTEXT.call(this, 'title')}>
            <span className="custom-icon custom-icon-title"></span>
          </div>
          <div className={classNameCenter} onClick={changeTEXT.call(this, 'center')} >
            <span className="custom-icon custom-icon-figcaption"></span>
          </div>
          <div className={classNameBlockquote} onClick={changeTEXT.call(this, 'blockquote')} >
            <span className="custom-icon custom-icon-blockquote"></span>
          </div>
        </div>
      </div>
    );
  }
}

TextMenuComponent.displayName = 'NavBarTextMenuComponent';

// Uncomment properties you need
// TextMenuComponent.propTypes = {};
// TextMenuComponent.defaultProps = {};

export default TextMenuComponent;
