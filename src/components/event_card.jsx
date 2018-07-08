import React from 'react';


class EventCard extends React.Component {

  constructor(props){
   super(props);
   this.state = {
    names: this.props.eventInfo.names,
   };
  }

  getNames(){
    //e.preventDefault();
    this.props.joinEvent(this.props.eventInfo.event_id)
      .then(res => res.json())
      .then(names => this.setState({names: names}));

    return true;
  }

  leaveEvent(i){
    let arr = this.props.eventInfo.names
    arr.splice(i, 1)
    this.setState({
      names: arr
    });
    // NEED TO PASS THIS STATE TO DB AND UPDATE
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
        <h6>People Going:</h6>
        <h6>{this.state.names}</h6>
        <button onClick={() => this.getNames()}>Join Event</button>
        <button onClick={() => this.leaveEvent()}>Leave Event</button>
      </div>
    );
  }
}

export default EventCard;
