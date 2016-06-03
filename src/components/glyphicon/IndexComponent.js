'use strict';

import React from 'react';
import Icon from 'react-icon';

Icon.setDefaultFontPrefix('glyphicon');

require('styles/glyphicon/Index.scss');

class IndexComponent extends React.Component {
  render() {
    return (
      <Icon glyph={this.props.glyph} />
    );
  }
}

IndexComponent.displayName = 'GlyphiconIndexComponent';

// Uncomment properties you need
IndexComponent.propTypes = {
  glyph: React.PropTypes.string.isRequired
};
// IndexComponent.defaultProps = {};

export default IndexComponent;
