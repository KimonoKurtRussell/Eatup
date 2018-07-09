import React from 'react';
import moment from 'moment';

class EventCard extends React.Component {

  constructor(props){
   super(props);
   this.state = {
    names: this.props.eventInfo.names,
    users: this.props.eventInfo.names.length,
   };
  }

  getNames(){
    if(this.props.currentUser){
      console.log("getting to getNames func")
      this.props.joinEvent(this.props.eventInfo.event_id)
      .then(res => res.json())
      .then(names => this.setState({names: names}));
    } else {
      window.alert("You must log in before joining an event!");
    }
  }

  //store users as a number and increment it
  //pass in id
  // this.setState((prevState) => {
   //  console.log({prevState});
   //  return {
   //    newNames: prevState.names.filter((name) => {
   //      return prevState.names.indexOf(name) !== prevState.names.length - 1;
   //    }),
   //    otherNewNames: '123'
   //  }
   // })

  leaveEvent(){
    this.setState((prevState) => {
      return {users: prevState.users - 1}
    })

  }


  render() {
    var start = this.props.eventInfo.event_start
    var end = this.props.eventInfo.event_end

    console.log('one event card in event list')

    return (
      <div>
        <h3>{this.props.eventInfo.event_name}</h3>
        <h4>{this.props.eventInfo.restaurant_name}</h4>
        <h5>{this.props.eventInfo.restaurant_address}</h5>
        <h6>{this.props.eventInfo.description}</h6>
        <h6>Start: {moment(start).format('dddd, MMMM Do YYYY, h:mm a')}     End: {moment(end).format('dddd, MMMM Do YYYY, h:mm a')}</h6>


        <div>{this.state.names[0]} and {this.state.users} others are going</div>


        <br></br>

        <button onClick={() => this.getNames()}>Join Event</button>
        <button onClick={() => this.leaveEvent()}>Leave Event</button>

      </div>
    );
  }
}

export default EventCard;
