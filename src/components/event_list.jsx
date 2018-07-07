import React from 'react';


class EventList extends React.Component {

  constructor(props){
   super(props);
  }

  render() {
    console.log('event_listdata', this.props.dbEventList)

    return (
      <div>
      <h2>Current Events You Can Join!</h2>
       { Object.values(this.props.dbEventList).map((event, idx) => {
          return (
           <div key={idx}>
            <h3>{event.event_name}</h3>
            <h4>{event.restaurant_name}</h4>
            <h5>{event.restaurant_address}</h5>
            <h6>{event.description}</h6>
            <h6>Start:{event.event_start} End:{event.event_end}</h6>
            <h6>People Going:</h6>
            <h6>{event.names}</h6>


            <button onClick={()=> this.props.joinEvent(event.id)}>Join Event</button>
            <button>Leave Event</button>
           </div>
           )})
        }
      </div>
    );
  }
}

export default EventList;