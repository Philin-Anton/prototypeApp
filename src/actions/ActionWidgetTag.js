/**
 * Created by Anton.Filin on 24.03.2016.
 */

import * as types from '../constants/ActionTypes';


const isExist = (arr, fieldName, value) => {
  window.console.log(arr);
  const _isExist = (item) => {
    return item[fieldName] == value;
  };

  return arr.some(_isExist);
};

const getToTagsUnsafe = () => {
  return {
    type: types.GET_TAGS
  }
};

export function getAllTags() {
  return (dispatch, getState)=> {
    const tags = getState().WidgetBlocks.tags;

    if (tags[0]) {
      dispatch(getToTagsUnsafe());
    }

  }
}

const addToTagUnsafe = (name, id) => {
  return {
    type: types.ADD_TAG,
    name,
    id
  }
};

export const addToTag = (name) => {
  return (dispatch, getState) => {
    const tags = getState().WidgetBlocks.tags;

    let ID = tags.length;

    if(ID > 1){
      ID = tags.reduce((revious, current) => {
        return current.id > revious.id ? current.id+1 : ID+1;
      });
    }

    if (!isExist(tags, 'name', name) && (name.length > 0)) {
      dispatch(addToTagUnsafe(name, ID));
    }

  }
};

const deleteToTagUnsafe = (id) => {
  return {
    type: types.DELETE_TAG,
    id
  }
};

export function deleteToTag(id) {
  return (dispatch, getState) => {
    const tags = getState().WidgetBlocks.tags;

    if (isExist(tags, 'id', id)) {
      dispatch(deleteToTagUnsafe(id));
    }
  }
}
