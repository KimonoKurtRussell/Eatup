import React from 'react';
import DateTimePicker from 'react-datetime-picker';


class Event extends React.Component {


constructor(props) {
  super(props);

}
state = {
  start: new Date(),
  end: new Date(),
  // submit: false,
}

onChange1 = start => this.setState({ start })
onChange2 = end => this.setState({ end })




handleFormSubmit = () => {
  console.log('clicked')
  this.setState({
    submit: true,
  })
}



render() {


 console.log("restaurant", this.props.restaurant)



  return (
   <div className="eventForm">
    <div style={{ display: (this.state.submit ? 'none': 'block')}}>
     <form onSubmit={this.props.getEventInput} >
     <input className="eventInfo" type='text' name= 'eventName' placeholder='Event Name' value={this.props.eventName}/>
     <br></br>
     <input className="eventInfo" type='text' name= 'restaurantName' placeholder="{this.props.restaurant.name}" value={this.props.restaurant.name}/>
     <br></br>
     <input className="eventInfo" type='text' name= 'address' value={this.props.restaurant.address}/>
     <br></br>
     <input className="eventInfo" type='text' name= 'city' value={this.props.restaurant.city}/>
     <br></br>
     <input className="eventInfo" type='text' name= 'state' value={this.props.restaurant.state}/>
     <br></br>
     <input className="eventInfo" type='text' name= 'country' value={this.props.restaurant.country}/>
     <br></br>

     <div>
     <DateTimePicker className="calendar" type='int' name='start' onChange={this.onChange1} returnValue="start" value={this.state.start}/>
     </div>
     <br></br>
     <div>
     <DateTimePicker className="calendar" type='int' name='end' onChange={this.onChange2} returnValue="end" value={this.state.end} />
     </div>
     <br></br>
     <textarea className="eventDescription" rows="4" cols="20" maxlength="250" type='text' name= 'description' placeholder='Event Description ' value={this.props.description}/>
     <br></br>
     <input className="hiddenRestaurantInfo" type='text' name= 'restaurantAddress' placeholder="{this.props.restaurant.address}" value={this.props.restaurant.addressString}/>
     <button onClick={this.handleFormSubmit}>Create Event</button>
    </form>
    </div>
    </div>

  )
}
}


export default Event;
