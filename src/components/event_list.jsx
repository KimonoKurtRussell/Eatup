import React from 'react';


class EventList extends React.Component {

  constructor(props){
   super(props);
  }

  render() {

  return (

    <div>
      <h5>event name</h5>
      <h5>Restaurant</h5>
      <h5>event desc</h5>
      <h5>time start to time end</h5>
      <ul>
        <li>users</li>
      </ul>
     <button>Join Event</button>
     <button>Leave Event</button>
    </div>

    );
  }
}



export default EventList