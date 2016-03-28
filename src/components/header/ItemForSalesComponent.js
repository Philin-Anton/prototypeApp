'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { actionWidgetForSales } from '../../actions/index';
const changeForSales =  actionWidgetForSales.changeForSales;


require('styles/header/ItemForSales.scss');

class ItemForSalesComponent extends React.Component {

  onChange(){
    this.props.changeForSales();
    //WidgetBlock
  }

  render() {
    return (
      <div className="itemforsales-component">
        <label><input type="checkbox" onChange={this.onChange.bind(this)}  checked={this.props.forSales}/> Item For Sales</label>
      </div>
    );
  }
}

ItemForSalesComponent.displayName = 'HeaderItemForSalesComponent';

// Uncomment properties you need
// ItemForSalesComponent.propTypes = {};
// ItemForSalesComponent.defaultProps = {};

const getAllState = state => state.WidgetBlocks;

const select = createSelector([getAllState], state => {
  return state;
});

export default connect(select, {changeForSales})(ItemForSalesComponent);
