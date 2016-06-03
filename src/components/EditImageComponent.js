'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import AvatarEditor from 'react-avatar-editor';
import FileChoose from './FileChooseComponent';
import Slider from 'react-slider';

import {drawFrame, getMax, classNames, toArray} from '../api/maggo';

require('styles//EditImage.scss');

import { actionArrayImageBlob, actionWidgetList, actionPopUpBlock } from '../actions/index';

const openPopUp = actionPopUpBlock.openPopUp;
const setImagePopUp = actionPopUpBlock.setImagePopUp;

const deleteArrayImage = actionArrayImageBlob.deleteArrayImage;
const addArrayImage = actionArrayImageBlob.addArrayImage;
const updateArrayImage = actionArrayImageBlob.updateArrayImage;

const updateWidgetBlock = actionWidgetList.updateWidgetBlock;
const checkWidgetBlock = actionWidgetList.checkWidgetBlock;
const addWidgetBlock = actionWidgetList.addWidgetBlock;

class EditImageComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      scale: 50,
      forSales: false,
      forSalesPrice: 0,
      linkURL:'',
      errors: {}
    };
  }

  addWidget(type, defauntHTML) {
    const {addWidgetBlock, checkWidgetBlock, widgetBlocks, openPopUp, setImagePopUp} = this.props;
    const {widgetsByIndex} = widgetBlocks;
    const getMaxID =  !!widgetsByIndex[0] ? getMax(widgetsByIndex, 'id') : -1;
    const newWidgets = {
      id: getMaxID + 1,
      type: type,
      html: defauntHTML || ''
    };
    addWidgetBlock(newWidgets);
    checkWidgetBlock(newWidgets);
    setImagePopUp(null);
    openPopUp(false);
  }

  onChangeSlider(scale){
    const _drawFrame = drawFrame(this.state);
    const nextState = _drawFrame({
      scale:{
        $set: scale
      }
    });
    this.setState(nextState);
  }

  handleSave(){
    var img = this.refs.imgEditor.getImage();
    const {orientation, imgIndex, forSales, forSalesPrice, linkURL } = this.state;
    const {addArrayImage, widgetBlocks, updateWidgetBlock, setImagePopUp, updateArrayImage, openPopUp} = this.props;
    const {checkWidget} = widgetBlocks;

    let errors ={};
    let _linkURL = linkURL;
    if (forSales) {
      if(!forSalesPrice) {
        errors.price = true;
      }
      if(_linkURL.search( /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ ) == -1) {
          errors.url = true;
      }
    }

    if(errors.price || errors.url){
      const newErrors = drawFrame(this.state)({
        errors:{
          $set: errors
        }
      });

      this.setState(newErrors);
      return false
    } else {
      if (_linkURL.indexOf('http') < 0) {
        _linkURL = 'http://' + _linkURL;
      }
    }

    const newArrayImage = {
      image: img,
      forSales: forSales,
      price: forSalesPrice
    };

    if(checkWidget && checkWidget.html){
      updateArrayImage(imgIndex, newArrayImage);
      if(forSales){
        checkWidget.html = '<figure class="align-'+ orientation +' "><p><img src="['+imgIndex+']" alt=""/>' +
          '<span>$' + forSalesPrice +
            '<a href="' + _linkURL + '" >Buy</a>' +
          '</span>' +
          '</p></figure>';
      }else{
        checkWidget.html = '<figure class="align-'+ orientation +' "><p><img src="['+imgIndex+']" alt=""/></p></figure>';
      }

      updateWidgetBlock(checkWidget);
      setImagePopUp(null);
      openPopUp(false);
    }else{
      addArrayImage(newArrayImage);
      if(forSales){
        this.addWidget.call(
          this, 'image',
          '<figure class="align-'+ orientation +' ">' +
            '<p>' +
              '<img src="['+widgetBlocks.arrayImage.length+']" alt=""/>' +
              '<span>$'
              + forSalesPrice +
                '<a href="' + _linkURL + '"}>Buy</a>' +
              '</span>' +
            '</p>' +
          '</figure>');
      }else{
        this.addWidget.call(this, 'image', '<figure class="align-'+ orientation +' "><p><img src="['+widgetBlocks.arrayImage.length+']" alt=""/></p></figure>');
      }
    }
  }

  componentWillMount(){
    const {widgetBlocks, imageURL} = this.props;
    const {scale, linkURL } = this.state;
    const {checkWidget, arrayImage} = widgetBlocks;

    let positionOrientation = 'none';
    let imgPath = '';
    let imgIndex = null;
    let forSales = null;
    let forSalesPrice = null;
    let link = linkURL;
    let scalePosition = scale;
    if(checkWidget && checkWidget.html){
      const DIV = document.createElement('div');
      DIV.innerHTML = checkWidget.html;
      const figure = DIV.childNodes[0];
      const img = figure.childNodes[0].childNodes[0];
      if(figure.childNodes[0].childNodes[1]){
        link = figure.childNodes[0].childNodes[1].childNodes[1].href;
      }
      const styleAttr = toArray(figure.attributes).filter((item)=>{
        if(item.name == 'style'){
          return item.value
        }
      });
      if(styleAttr && styleAttr.indexOf('none') === -1){
        positionOrientation = styleAttr.indexOf('left') != -1 ? 'left' : 'right';
      }
      const src = img.src.split('/').filter((item, index, arr) => {
        if(arr.length-1 === index){
          return item
        }
      });
      imgIndex = JSON.parse(decodeURI(src))[0];
      imgPath = arrayImage[imgIndex].image;
      forSales = arrayImage[imgIndex].forSales;
      forSalesPrice = arrayImage[imgIndex].price;
      scalePosition = 0;
    }else{
      imgPath = imageURL;
    }
    const _drawFrame = drawFrame(this.state);
    const nextState = _drawFrame({
      image: {
        $set: imgPath
      },
      orientation: {
        $set: positionOrientation
      },
      scale: {
        $set: scalePosition
      },
      imgIndex: {
        $set: imgIndex
      },
      forSales:{
        $set: forSales
      },
      forSalesPrice:{
        $set: forSalesPrice || 0
      },
      linkURL:{
        $set: link
      }
    });
    this.setState(nextState);
  }
  selectOrientation(orientation){
    const _drawFrame = drawFrame(this.state);
    const nextState = _drawFrame({
      orientation: {
        $set: orientation
      }
    });
    this.setState(nextState);
  }
  forSalesSelect(){
    const valueForSales = !!this.state.forSales ? false : true;
    const _drawFrame = drawFrame(this.state);
    const nextState = _drawFrame({
      forSales:{
        $set: valueForSales
      }
    });
    this.setState(nextState);
  }
  forSalesPriceSelect(event){
    const valueForSalesPrice = event.target.value;
    const _drawFrame = drawFrame(this.state);


    const nextState = _drawFrame({
      forSalesPrice:{
        $set: valueForSalesPrice
      },
      errors:{
        price:{
          $set : false
        }
      }
    });
    this.setState(nextState);
  }
  linkURL(event){
    const url = event.target.value;
    const _drawFrame = drawFrame(this.state);
    const nextState = _drawFrame({
      linkURL:{
        $set: url
      },
      errors:{
        url:{
          $set : false
        }
      }
    });
    this.setState(nextState);
  }

  render() {
    const {imageURL} = this.props;
    const {scale, image, orientation, forSales, forSalesPrice, linkURL, errors} = this.state;
    const src = imageURL || image;

    const classNameLeft = classNames({
      'bottom-control': true,
      'active': orientation == 'left'
    });
    const classNameCenter = classNames({
      'bottom-control': true,
      'active': orientation == 'none'
    });
    const classNameRight = classNames({
      'bottom-control': true,
      'active': orientation == 'right'
    });
    const classNameSales = classNames({
      'for-sales-block row': true,
      'for-sales-block-check': forSales == true
    });
    const classNamePrise = classNames({
      'item-price': true,
      'error': errors.price
    });
    const classNameUrl = classNames({
      'item-url': true,
      'error': errors.url
    });
    const classNameSave = classNames({
      'saveImageBottom': true,
      'error': errors.url || errors.price
    });
    return (
      <div className="editimage-component">
        <div className="preview">
          <FileChoose text="Choose image"/>
          <AvatarEditor
            ref="imgEditor"
            image={src}
            width={282}
            height={282}
            border={0}
            onSave={this.handleSave.bind(this)}
            color={[255, 255, 255, 0.6]}
            scale={1+(scale / 10)} />
          <Slider defaultValue={scale} onChange={this.onChangeSlider.bind(this)} withBars orientation={'vertical'}>
            <div className="my-handle">O</div>
          </Slider>
          <p className="image-info">
            Hold and drag to pan
          </p>
        </div>
        <div className="setting-block">
          <div className="row position-control">
            <div className="inner-wrapper">
              <div className={classNameLeft} onClick={this.selectOrientation.bind(this, 'left')}>
                <span className="custom-icon custom-icon-align-left"></span>
              </div>
              <div className={classNameCenter} onClick={this.selectOrientation.bind(this, 'none')}>
                <span className="custom-icon custom-icon-align-center"></span>
              </div>
              <div className={classNameRight} onClick={this.selectOrientation.bind(this, 'right')}>
                <span className="custom-icon custom-icon-align-right"></span>
              </div>
            </div>
          </div>

          <div className={classNameSales}>
            <div className="inner-wrapper">
              <div className="grid-wrapper">
                <div className="item-check">
                  <label>
                    <input type="checkbox" onClick={this.forSalesSelect.bind(this)} defaultChecked={forSales}/>
                    <span>Item for sale</span>
                  </label>
                </div>

                <div className={classNamePrise}>
                  <div>
                    <label>
                      <span>$</span>
                      <input type="number" ref="priceEditor" onChange={this.forSalesPriceSelect.bind(this)} disabled={!this.state.forSales} value={forSalesPrice}/>
                    </label>
                  </div>
                </div>
              </div>

              <div className={classNameUrl}>
                <label>
                  <span>URL</span>
                  <input type="url" onChange={this.linkURL.bind(this)} disabled={!this.state.forSales} value={linkURL}/>
                </label>
              </div>

            </div>
          </div>

          <div className="row saveImageBlock">
            <div className={classNameSave} onClick={this.handleSave.bind(this)}>
              Done
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidUpdate(){
  }
}

EditImageComponent.displayName = 'EditImageComponent';

// Uncomment properties you need
// EditImageComponent.propTypes = {};
// EditImageComponent.defaultProps = {};
const getWidgetBlocksState = state => state.WidgetBlocks;
const getPopUpBlockState = state => state.PopUpBlock;

const select = createSelector([getWidgetBlocksState, getPopUpBlockState], (widgetBlocks, popUpBlock) => {
  return {widgetBlocks, popUpBlock};
});

export default connect(select,{updateWidgetBlock, addWidgetBlock, checkWidgetBlock, deleteArrayImage, addArrayImage, updateArrayImage, openPopUp, setImagePopUp}
)(EditImageComponent);
