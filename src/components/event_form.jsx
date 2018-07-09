import React from 'react';
import DateTimePicker from 'react-datetime-picker';


class Event extends React.Component {


constructor(props) {
   super(props);

 }
 state = {
   start: new Date(),
   end: new Date(),
 }

 onChange1 = start => this.setState({ start })
 onChange2 = end => this.setState({ end })




 render() {

  console.log("restaurant", this.props.restaurant)

   return (
     <div className="eventForm">
    <div style={{ display: (this.state.submit ? 'none': 'block')}}>
     <form onSubmit={this.props.getEventInput} >
     <input className="restaurantInfo" type='text' name= 'restaurantName' placeholder="{this.props.restaurant.name}" value={this.props.restaurant.name}/>
     <br></br>
     <input className="restaurantInfo" type='text' name= 'restaurantAddress' placeholder="{this.props.restaurant.address}" value={this.props.restaurant.address}/>
     <br></br>
     <input type='text' name= 'eventName' placeholder='Event Name' value={this.props.eventName}/>
     <br></br>
     <div>
     <DateTimePicker className="calendar" type='int' name='start' onChange={this.onChange1} returnValue="start" value={this.state.start}/>
     </div>
     <br></br>
     <div>
     <DateTimePicker className="calendar" type='int' name='end' onChange={this.onChange2} returnValue="end" value={this.state.end} />
     </div>
     <br></br>
     <input type='text' name= 'description' placeholder='Event Description ' value={this.props.description}/>
     <br></br>
     <button onClick={this.handleFormSubmit}>Create Event</button>
    </form>
    </div>
    </div>

   )
 }
}

export default Event;
