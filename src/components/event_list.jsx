import React from 'react';
import EventCard from './event_card.jsx'
import Collapsible from 'react-collapsible';


class EventList extends React.Component {


  render() {
    //console.log('event_listdata', this.props.dbEventList)

    return (
      <div>
       { Object.values(this.props.dbEventList).map((event, idx) => {
          return (
            <Collapsible className="eventCards" openedClassName="eventCardsOpen" transitionTime="250" transitionCloseTime="5"  trigger={<h1>{event.event_name}</h1>} key={idx}>
           <EventCard eventInfo={event} joinEvent={this.props.joinEvent} leaveEvent={this.props.leaveEvent} currentUser = {this.props.currentUser}/>
          </Collapsible>
        )})
      }
      </div>
    );
  }
}

export default EventList;
