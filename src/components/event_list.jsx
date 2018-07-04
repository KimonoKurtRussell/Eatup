import React from 'react';


class EventList extends React.Component {

constructor(props){
  super(props);

}



// <h5>{event.users.avatarphoto}</h5> to be used when avatar photos are implemented

// {this.props.events.map((event, i) => (

render() {

 return (

   <div>
   <h5>Nolan's 28th Birthday</h5>
   <h5>Restaurant</h5>
   <h5>An event to end all events</h5>
   <h5>May 1st 12:00 to May 1st 12:01</h5>
   <ul>
   <li>Nolan</li>
   </ul>
  <button>Join Event</button>
  <button>Leave Event</button>
   </div>

   )
 }
}



export default EventList
