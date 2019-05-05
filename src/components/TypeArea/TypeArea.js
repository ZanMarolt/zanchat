import React, { PureComponent } from 'react';
import './TypeArea.css';

class TypeArea extends PureComponent {
  handleSend = () => {
    const typeArea = this.refs.typeArea;
    if (typeArea.value) {
      this.props.onEnterPress(typeArea.value);
      typeArea.value = '';
    }
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSend();
    }
  }

  handleButtonPress = () => {
    this.handleSend();
  }

  render() {
    return (
      <div className="container">
        <input
          className="area"
          onKeyUp={this.handleKeyPress}
          ref="typeArea" />
        <button
          onClick={this.handleButtonPress}
        >
          Send
        </button>
      </div>
    );
  }
}

export default TypeArea;
