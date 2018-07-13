import React from 'react';
import moment from 'moment';


class EventCurrent extends React.Component {

  constructor(props){
   super(props);
  }

  executeClick = () => {
    this.props.joinEvent(this.props.events.id);
    this.props.returnHome();
  }

  render() {

    // const start = this.props.events.event_start
    // const end = this.events.event_end
    console.log(this.props.city)

    return (
      <div class="currentEvent" >
        <h3 className="hvr-grow">{this.props.events.event_name}</h3>
        <h5 className="hvr-grow">{this.props.events.restaurant_name}</h5>
         <h5 className="hvr-grow">{this.props.address}</h5>
         <h5 className="hvr-grow">{this.props.city}</h5>
         <h5 className="hvr-grow">{this.props.state}</h5>
         <h5 className="hvr-grow">{this.props.country}</h5>
         <h4>Description</h4>
        <h5 className="hvr-grow">{this.props.events.description}</h5>
        <h4>Start</h4>
        <h5 className="hvr-grow">{moment(this.props.events.event_start).format('dddd, MMMM Do YYYY, h:mm a')}</h5>
        <h4>End</h4>
        <h5 className="hvr-grow">{moment(this.props.events.event_end).format('dddd, MMMM Do YYYY, h:mm a')}</h5>

          <button className='confirmButton' onClick={() => this.executeClick()}>CONFIRM</button>
      </div>
    )
  }
}



export default EventCurrent;
