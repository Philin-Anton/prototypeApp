'use strict';

import React from 'react';

import ImageLoader from 'react-imageloader';
import FileInput from 'react-file-input';

require('styles//FileInput.scss');

class LoadIMAGE {

  constructor(imgObject) {
    this.imgObject = imgObject
  }

  getImg() {
    return this.imgObject ? this.imgObject : {};
  }

  getImgPath() {
    return this.imgObject ? window.URL.createObjectURL(this.imgObject) : ''
  }

  setImg(image) {
    this.imgObject = image;
  }

}

class FileInputComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      load: false
    };
  }

  handleChange(event) {
    try {
      this.setState({
        load: new LoadIMAGE(event.target.files[0])
      });
    } catch (e) {
      window.console.error(new Error(e));
    }
  }

  render() {
    window.console.log(this.state);
    return (
      <div className="fileinput-component">
        <form>
          <FileInput name="myImage"
                     accept=".png,.gif"
                     placeholder="My Image"
                     className="inputClass"
                     onChange={this.handleChange}/>

          {
            this.state.load ?
            <ImageLoader
                src={this.state.load.getImgPath()}
                wrapper={React.DOM.div}
                preloader={this.state.load.getImgPath}>
                Image load failed!
              </ImageLoader>
              :
              <div className="atata"></div>
          }

        </form>
      </div>
    );
  }
}


FileInputComponent.propTypes = {
  load: React.PropTypes.string.isRequired
};

FileInputComponent.displayName = 'FileInputComponent';

// Uncomment properties you need
// FileInputComponent.propTypes = {};
// FileInputComponent.defaultProps = {};

export default FileInputComponent;
