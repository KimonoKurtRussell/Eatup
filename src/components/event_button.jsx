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
    <div onClick={this.props.handleClick}>
      {text}
    </div>
  );
}
}



export default ToggleButton;