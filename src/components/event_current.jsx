import React from 'react';

class EventCurrent extends React.Component {

 constructor(props){
  super(props);

}

render() {

 return (

   <div>
   <h5>{this.props.eventName}</h5>
   <h5>Restaurant</h5>
   <h5>{this.props.description}</h5>
   <h5>{this.props.start} to {this.props.end}</h5>
   <ul>
   <li>Nolan</li>
   </ul>
  <button>Leave Event</button>
   </div>

   )
 }
}



export default EventCurrent
