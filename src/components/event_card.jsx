import React from 'react';
import moment from 'moment';
import { withAlert } from "react-alert";

class EventCard extends React.Component {

  constructor(props){
   super(props);
   this.state = {
    names: this.props.eventInfo.names
   };
    this.disableButton = false;
  }

  getNames(){
    this.disableButton = true;
    var nameList = this.props.eventInfo.names;

    console.log(this.props);
    if(this.props.currentUser){
      if(this.props.eventInfo.names.includes(this.props.currentUser.username)){
        this.props.alert.show('You have already joined the event :)')
        this.disableButton = false;
      } else {
         console.log("getting to getNames func")
        this.props.joinEvent(this.props.eventInfo.event_id)
        .then(res => res.json())
        .then(names => {
          this.setState({names: names})
          this.disableButton = false;
        });
      }

    } else {
      this.props.alert.show("You must log in before joining an event!");
      this.disableButton = false;
    }
  }


  leaveEvent(){
    if(this.props.currentUser){
      console.log("getting to leaveEvent func")
      this.props.leaveEvent(this.props.eventInfo.event_id)
      .then(res => res.json())
      .then(names => this.setState({names: names}));
    } else {
      this.props.alert.show('You must log in before leaving an event!')
    }

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
        <h6>Start: {moment(start).format('dddd, MMMM Do YYYY, h:mm a')}</h6>
        <h6>End: {moment(end).format('dddd, MMMM Do YYYY, h:mm a')}</h6>

        {this.state.names.length > 1 && <div>{this.state.names[0]} and {this.state.names.length - 1} others are going</div>}
        {this.state.names.length === 1 && <div>{this.state.names[0]} is going</div>}

        <br></br>

        <button disabled={this.disableButton} onClick={() => this.getNames()}>Join Event</button>
        <button disabled={this.disableButton} onClick={() => this.leaveEvent()}>Leave Event</button>

      </div>
    );
  }
}

export default withAlert(EventCard);