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
  <h5>event name</h5>
  <h5>Restaurant</h5>
  <h5>event desc</h5>
  <h5>time start to time end</h5>
  <ul>
  <li>user</li>
  </ul>
 <button>Join Event</button>
 <button>Leave Event</button>
  </div>

  )
}
}



export default EventList