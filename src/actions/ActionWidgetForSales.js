/**
 * Created by Anton.Filin on 24.03.2016.
 */
'use strict';

import * as types from '../constants/ActionTypes';


const changeForSalesUnsafe = () =>{
  return {
    type: types.CHANGE_FOR_SALES
  }
};

export const changeForSales = () => {
  return (dispatch)=> {
      dispatch(changeForSalesUnsafe());
  }
};


//const getForSalesUnsafe = () => {
//  return {
//    type: types.GET_FOR_SALES
//  }
//};
