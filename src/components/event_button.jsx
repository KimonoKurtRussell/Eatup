import React from 'react';

class ToggleButton extends React.Component {

constructor() {
  super();

}

render() {
  const text = this.props.create ? 'Event Created' : 'Start Event';

  if (this.props.create) {
    return null;
  }

  return (
    <div>
    <button onClick={this.props.handleClick}>
      {text}
    </button>
  </div>
  );
}
}



export default ToggleButton;
