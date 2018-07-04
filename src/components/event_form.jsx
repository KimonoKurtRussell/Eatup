import React from 'react';



class Event extends React.Component {


constructor() {
   super();

 }

 render() {

   // if (!this.props.eventName) {
   //   return null;
   // }

   return (
     <div>
      <form onSubmit={this.props.getEventInput} >
      <input type='text' name= 'restaurantName' placeholder="restaurant name" value={this.props.restaurantName}/>
      <input type='text' name= 'restaurantAddress' placeholder="restaurant address" value={this.props.restaurantAddress}/>
      <input type='text' name= 'eventName' placeholder='Event Name' value={this.props.eventName}/>
      <input type='int' name= 'start' placeholder='Event Start'/>
      <input type='int' name= 'end' placeholder='Event End' value={this.props.end}/>
      <input type='text' name= 'description' placeholder='Event Description ' value={this.props.description}/>
      <button>Create Event</button>
     </form>
     </div>

   )
 }
}

export default Event;
