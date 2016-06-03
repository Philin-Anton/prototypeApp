'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'


import {drawFrame, getElem, getIndex,  getDefaultManager} from '../../api/maggo';

import WidgetBlock from './WidgetBlockComponent';
import { actionWidgetList, actionPopUpBlock, actionRichEditor } from '../../actions/index';
const checkWidgetBlock = actionWidgetList.checkWidgetBlock;
const deleteWidgetBlock = actionWidgetList.deleteWidgetBlock;
const reorderWidgetBlock = actionWidgetList.reorderWidgetBlock;

const openPopUp = actionPopUpBlock.openPopUp;
const changeStepPopUp = actionPopUpBlock.changeStepPopUp;
const changeTitlePopUp = actionPopUpBlock.changeTitlePopUp;

const saveRange = actionRichEditor.saveRange;

require('styles/widgets/WidgetsList.scss');

class WidgetsListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      widgetsCheck: {
        id : -1
      }
    };
    this.drawFrame = drawFrame(this.state);
  }

  widgetsListMove(id, afterId) {
    const widgetsByIndex = this.props.widgetBlocks.widgetsByIndex;
    const widget = getElem(widgetsByIndex, id);
    const afterWidget = getElem(widgetsByIndex, afterId);
    const widgetIndex = getIndex(widgetsByIndex, widget);
    const afterIndex = getIndex(widgetsByIndex, afterWidget);

    this.props.reorderWidgetBlock(widgetIndex, afterIndex, widget );
  }

  widgetsCheck(elem){
    this.props.checkWidgetBlock(elem);
  }

  render() {
    const {widgetBlocks, editorBlock, deleteWidgetBlock, openPopUp, changeStepPopUp, changeTitlePopUp, saveRange} = this.props;
    const {widgetsByIndex, checkWidget} = widgetBlocks;
    const {range} = editorBlock;
    return (
      <div className={'widgetslist-component '}>
        {
          widgetsByIndex.map(widget => {
            return(
              <WidgetBlock
                key={widget.id}
                id={widget.id}
                type={widget.type}
                html={widget.html}
                widgetsListMove={this.widgetsListMove.bind(this)}
                widgetsCheck={this.widgetsCheck.bind(this)}
                getWidgetElem = {widget}
                getCheckWidget = {checkWidget}
                deleteWidgetBlock = {deleteWidgetBlock}
                openPopUp = {openPopUp}
                changeStepPopUp = {changeStepPopUp}
                changeTitlePopUp = {changeTitlePopUp}
                changeTitlePopUp = {changeTitlePopUp}
                range = {range}
                saveRange = {saveRange}
                />
            )})
        }
      </div>
    )
  }
}

WidgetsListComponent.displayName = 'WidgetsWidgetsListComponent';

// Uncomment properties you need
// WidgetsListComponent.propTypes = {};
// WidgetsListComponent.defaultProps = {};

const getWidgetBlocksState = state => state.WidgetBlocks;
const getEditorBlockState = state => state.EditorBlock;

const select = createSelector([getWidgetBlocksState, getEditorBlockState], (widgetBlocks, editorBlock) => {
  return {widgetBlocks, editorBlock};
});

export default connect(select,
  {checkWidgetBlock, reorderWidgetBlock, deleteWidgetBlock, openPopUp, changeStepPopUp, changeTitlePopUp, saveRange}
)(getDefaultManager()(WidgetsListComponent));
