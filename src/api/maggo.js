/**
 * @author Anton.Filin
 */
import update from 'react/lib/update';
import classnames from 'classnames';
import MobileDetect from 'mobile-detect';

export const clearLocalStore = () => {
  localStorage.clear();
};

export const setLocalStore = (store, nameStore) => {
  const storeJSON = JSON.stringify(store);
  const nameStorage = nameStore || 'MagooStore';

  localStorage.setItem(nameStorage, storeJSON);
  return store;
};

export const getLocalStore = (nameStore) => {
  const nameStorage = nameStore || 'MagooStore';
  const storeJSON = window.localStorage.getItem(nameStorage);
  window.console.log('5');
  return window.JSON.parse(storeJSON);
};

export const drawFrame = (state) => {
  return (updateFn) => {
    return update(state, updateFn);
  };
};

export const getMax = (mass, attrib) => {
  return Math.max.apply(null, mass.map(item => item[attrib]))
};

export const toArray = (obj) =>{ return [].slice.call(obj) };

export const getMin = (mass, attrib) => {
  return Math.min.apply(null, mass.map(item => item[attrib]))
};

export const getElem = (mass, id) => {
  return mass.filter(item => {
    return item.id == id
  })[0];
};
export const getLastElem = (mass) => {
  return mass[mass.length-1];
};

export const getIndex = (mass, elem) => {
  return mass.findIndex(item => {
    return JSON.stringify(item) == JSON.stringify(elem);
  });
};

export const classNames = (classes) => {
  return classnames(classes);
};

export const throttle = (func, ms) => {
  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};

export const md = new MobileDetect(window.navigator.userAgent);


import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';

const Backend = !!(md.mobile()|| md.phone() || md.tablet())? TouchBackend : HTML5Backend;
let defaultManager;
export const getDefaultManager = () => {
  if (!defaultManager) {
    defaultManager = DragDropContext(Backend);
  }
  return defaultManager;
};

export const htmlToObject = (html) => {
  if(!html) return false;
  const DIV = document.createElement('div');
  DIV.innerHTML = html;
  return DIV;
};

export const htmlToString = (html) => {
  if(!html) return false;
  const DIV = document.createElement('div');
  DIV.appendChild(html);
  return DIV.innerHTML;
};

export const getContent = (state) => {
  const importStyle = require('../styles/importStyle/importStyle.css')[0][1];
  const {arrayImage, tags, title, widgetsByIndex, bodyColor} = state;

  let html = widgetsByIndex.map((item)=>{
    if(item.type != 'text'){
      return item.html;
    }else{
      return htmlToString(htmlToObject(item.html));
    }
  });

  html.push('<style>'+importStyle+'</style>');
  html = '<div class="article color-'+bodyColor.id+'">'+ html.join('') +'</div>';

  return ({
    title:title,
    tags:tags,
    arrayImage:arrayImage,
    html:html
  });

};

export const setContent = (content) => {

  const {arrayImage, tags, title, html} = content;

  let widgetsByIndex = [];
  let bodyColor = {};

  const DIV = htmlToObject(html).childNodes[0];

  let bodyColorID = DIV.className;

  bodyColorID = bodyColorID.split(' ');

  bodyColorID = bodyColorID.filter((item)=>(
    item && item.indexOf('color') != -1
  ))[0];

  bodyColorID = bodyColorID.split('-')[1];

  bodyColor.id = bodyColorID;

  toArray(DIV.childNodes).forEach((item)=>{
    switch (item.nodeName.toUpperCase()){
      case 'FIGURE':
        const htmlStringFIGURE = htmlToString(item);
          widgetsByIndex.push({
            id: widgetsByIndex.length,
            type: 'image',
            html: htmlStringFIGURE
          });
        break;
      case 'HR':
        const htmlStringHR = htmlToString(item);
          widgetsByIndex.push({
            id: widgetsByIndex.length,
            type: 'line',
            html: htmlStringHR
          });
        break;
      case 'DIV':
        const htmlStringDIV = item.innerHTML;
        if(htmlStringDIV){
          widgetsByIndex.push({
            id: widgetsByIndex.length,
            type: 'text',
            html: htmlStringDIV
          });
        }
        break;
    }

    return({
      title,
      tags,
      arrayImage,
      widgetsByIndex
    });
  });



  return {
    arrayImage, tags, title, widgetsByIndex, bodyColor
  };

};
