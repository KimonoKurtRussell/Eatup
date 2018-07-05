import React from 'react';

class EventCurrent extends React.Component {

 constructor(props){
  super(props);

}

render() {

 return (
   <div>
   <p>{this.props.event_data}</p>
   </div>
   )
 }
}

export default EventCurrent;
