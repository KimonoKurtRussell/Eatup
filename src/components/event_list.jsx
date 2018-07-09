import React from 'react';
import EventCard from './event_card.jsx'


class EventList extends React.Component {


  render() {
    //console.log('event_listdata', this.props.dbEventList)

    return (
      <div>
      <h2>Current Events You Can Join!</h2>
       { Object.values(this.props.dbEventList).map((event, idx) => {
          return (
           <div key={idx}>
            <EventCard eventInfo={event} joinEvent={this.props.joinEvent} currentUser={this.props.currentUser}/>
           </div>
           )})
        }
      </div>
    );
  }
}

export default EventList;