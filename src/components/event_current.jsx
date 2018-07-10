import React from 'react';

class EventCurrent extends React.Component {

  constructor(props){
   super(props);
  }

  executeClick = () => {
    this.props.joinEvent(this.props.events.id);
    this.props.returnHome();
  }

  render() {

    return (

      <div>
        <h5>{this.props.events.event_name}</h5>
        <h5>{this.props.events.restaurant_name}</h5>
        <h5>{this.props.events.restaurant_address}</h5>
        <h5>{this.props.events.description}</h5>
        <h5>{this.props.events.event_start} to {this.props.events.event_end}</h5>
        <h5>People Going:</h5>
        <ul>
          <li>{this.props.currentUser}</li>
        </ul>
          <button onClick={() => this.executeClick()}>CONFIRM</button>
      </div>
    )
  }
}



export default EventCurrent;
