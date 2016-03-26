/**
 * Created by Anton.Filin on 24.03.2016.
 */
'use strict';


export function ADD_TAG(text){
  return {
    type: 'ADD_TAG',
    name: text
  }
}

export const DELETE_TAG = (id) => {
  return {
    type: 'DELETE_TAG',
    id: id
  }
};
