/**
 * Created by Anton.Filin on 24.03.2016.
 */

import * as ActionWidgetTag from './ActionWidgetTag';
import * as ActionWidgetTitle from './ActionWidgetTitle';
import * as ActionWidgetBlock from './ActionWidgetBlock';
import * as ActionWidgetNavBar from './ActionWidgetNavBar';
import * as ActionWidgetForSales from './ActionWidgetForSales';
import * as ActionWidgetBodyColor from './ActionWidgetBodyColor';

export const actionWidgetTag = ( () => {
  return ActionWidgetTag;
})();

export function actionWidgetTitle (){
  return ActionWidgetTitle;
}
export function actionWidgetBlock (){
  return ActionWidgetBlock;
}
export function actionWidgetNavBar (){
  return ActionWidgetNavBar;
}
export function actionWidgetForSales (){
  return ActionWidgetForSales;
}
export function actionWidgetBodyColor (){
  return ActionWidgetBodyColor;
}

