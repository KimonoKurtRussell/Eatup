import React from 'react';


class EventCard extends React.Component {

  constructor(props){
   super(props);
   this.state = {
    names: this.props.eventInfo.names,
    errorMessage: false
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
      // this.setState({errorMessage: true})
    }

    // return true;
  }

   leaveEvent(i){
     let arr = this.props.eventInfo.names
     arr.splice(i, i)
     this.setState({
       names: arr
   });
   }

  render() {
    console.log('one event card in event list')

    return (
      <div>
        <h3>{this.props.eventInfo.event_name}</h3>
        <h4>{this.props.eventInfo.restaurant_name}</h4>
        <h5>{this.props.eventInfo.restaurant_address}</h5>
        <h6>{this.props.eventInfo.description}</h6>
        <h6>Start:{this.props.eventInfo.event_start}     End:{this.props.eventInfo.event_end}</h6>
        {/*<div>
          {this.state.names.map((name, i) => <p key={i}>{name}</p>)}
        </div>*/}
        {/*<div>{this.state.names.join(", ")}</div>*/}
        <div>{this.state.names[0]} and {this.state.names.length} others are going</div>
        <br></br>
        <button onClick={() => this.getNames()}>Join Event</button>
        <button onClick={() => this.leaveEvent()}>Leave Event</button>
      </div>
    );
  }
}

export default EventCard;

//work on bug fix where like if you are
//already joined an event you cant join it again
