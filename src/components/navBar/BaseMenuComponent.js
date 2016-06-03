'use strict';

import React from 'react';
import BodyColor from '../header/BodyColorComponent';

import {md, classNames} from '../../api/maggo';

class BaseMenuComponent extends React.Component {

  onChange(event) {
    const {selectionMobileIMG} = this.props;
    const path = window.URL.createObjectURL(event.target.files[0]);
    selectionMobileIMG(path);
  }

  onClick(func){
    const {selectionMore} = this.props;
    return (event)=>{
      selectionMore('false');
      func(event);
    }
  }

  render() {

    const {selectionHR, selectionText, selectionIMG, selectionMore, isMore, checkWidgetBlock} = this.props;
    const classNamesMore = classNames({
      'bottom-control': true,
      'active': isMore
    });
    const isCheckLine = typeof checkWidgetBlock == 'function';
    const classNamesSelectLine = classNames({
      'fix-wrapper': true,
      'isCheck-line': isCheckLine
    });
    return (
      <div className="basemenu-component">
        <div className={classNamesSelectLine} onClick={isCheckLine ? checkWidgetBlock.bind(this,{}) : null } >
          <BodyColor isMore={isMore} selectionMore={selectionMore}/>

          <div className="bottom-control" onClick={this.onClick.call(this, selectionHR)}>
            <span className="custom-icon custom-icon-divider"></span>
          </div>

          <div className="bottom-control" onClick={!!(md.mobile()|| md.phone() || md.tablet())? '' : this.onClick.call(this, selectionIMG)}>
            <span className="custom-icon custom-icon-image"></span>
            {
              !!(md.mobile() || md.phone() || md.tablet()) ?
                <input type="file" onChange={this.onChange.bind(this)} value="" accept="image/jpeg,image/png,image/gif"/> : null
            }
          </div>

          <div className="bottom-control" onClick={this.onClick.call(this, selectionText)}>
            <span className="custom-icon custom-icon-font"></span>
          </div>

          {
            !!(md.mobile()|| md.phone() || md.tablet())?
              <div className={classNamesMore} onClick={selectionMore}>
                <span className="custom-icon custom-icon-more"></span>
              </div>
              : null

          }

        </div>
      </div>
    );
  }
}

BaseMenuComponent.displayName = 'NavBarBaseMenuComponent';

// Uncomment properties you need
// BaseMenuComponent.propTypes = {};
// BaseMenuComponent.defaultProps = {};

export default BaseMenuComponent;
