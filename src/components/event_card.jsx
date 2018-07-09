import React from 'react';


class EventCard extends React.Component {

  constructor(props){
   super(props);
   this.state = {
    names: this.props.eventInfo.names,
    id: this.props.eventInfo.id
   };
  }


  getNames(){
    if(this.props.currentUser){
      this.props.joinEvent(this.props.eventInfo.event_id)
      .then(res => res.json())
      .then(names => this.setState({names: names}));

    } else {
      window.alert('You must log in before joining an event!');
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

    // NEED TO PASS THIS STATE TO DB AND UPDATE
    // fetch(`leaveEvent`, {
    //   method: "POST",
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     names: this.props.eventInfo.names
    //     user: this.props.dbEventList.names
    //   })
    // })
  }

  render() {
    console.log('one event card in event list')

    return (
      <div className='toggleEventInfo'>
        <p>{this.props.eventInfo.restaurant_name}</p>
        <p>{this.props.eventInfo.restaurant_address}</p>
        <p>{this.props.eventInfo.description}</p>
        <p>Start:{this.props.eventInfo.event_start}</p>
        <p>End:{this.props.eventInfo.event_end}</p>
        <div>{this.state.names[0]} and {this.state.names.length} others are going</div>
        <button onClick={() => this.getNames()}>Join Event</button>
        <button onClick={() => this.leaveEvent()}>Leave Event</button>
      </div>
    );
  }
}

export default EventCard;
