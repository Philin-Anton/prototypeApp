/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import TextMenuComponent from 'components/navBar/TextMenuComponent.js';

describe('TextMenuComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(TextMenuComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('textmenu-component');
  });
});
