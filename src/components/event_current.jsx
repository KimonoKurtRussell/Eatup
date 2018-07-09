import React from 'react';
import moment from 'moment';

class EventCurrent extends React.Component {

  constructor(props){
   super(props);

  }

  render() {
    var start = this.props.events.event_start
    var end = this.props.events.event_end

    return (

      <div>
        <h5>{this.props.events.event_name}</h5>
        <h5>{this.props.events.restaurant_name}</h5>
        <h5>{this.props.events.restaurant_address}</h5>
        <h5>{this.props.events.description}</h5>
        <h5>Start: {moment(start).format('dddd, MMMM Do YYYY, h:mm a')}     End: {moment(end).format('dddd, MMMM Do YYYY, h:mm a')}</h5>
        <button onClick={() => this.props.joinEvent(this.props.events.id)}>CONFIRM</button>
      </div>

    )
  }
}



export default EventCurrent;