'use strict';

import React from 'react';
import Icon from '../glyphicon/IndexComponent';

import {  classNames } from '../../api/maggo';

require('styles/navBar/HrMenu.scss');

class HrMenuComponent extends React.Component {

  solid(){
    return '<hr class="hr-solid-decorated"/>';
  }
  dotted(){
    return '<hr style="border: 1px dotted; border-color: inherit;"/>';
  }
  dashed(){
    return '<hr style="border: 1px dashed; border-color: inherit;"/>';
  }

  isActive(list){
    const listClass = [].slice.call(list);
    listClass.some((item)=>(
       item == 'active'
    ));
  }

  onClick(func){
    const {changeHR} = this.props;
    return(e)=>{
      const classList = e.currentTarget.classList;
      const isActive = this.isActive(classList);
      if(isActive) return false;
      changeHR(func())
    }
  }

  render() {
    const {html} = this.props;
    const classNameSolid  = classNames({
      'bottom-control': true,
      'active': this.solid() == html
    });
    const classNameDotted  = classNames({
      'bottom-control': true,
      'active': this.dotted() == html
    });
    const classNameDashed  = classNames({
      'bottom-control': true,
      'active': this.dashed() == html
    });
    return (
      <div className="hrmenu-component">
        <div className={classNameSolid} onClick={this.onClick.call(this, this.solid)} >
          <Icon glyph="hr-line" />
        </div>
        <div className={classNameDotted}  onClick={this.onClick.call(this, this.dotted)} >
          <Icon glyph="hr-line-break" />
        </div>
        <div className={classNameDashed}  onClick={this.onClick.call(this, this.dashed)} >
          <Icon glyph="hr-line-break-big" />
        </div>
      </div>
    );
  }
}

HrMenuComponent.displayName = 'NavBarHrMenuComponent';

// Uncomment properties you need
// HrMenuComponent.propTypes = {};
// HrMenuComponent.defaultProps = {};

export default HrMenuComponent;
