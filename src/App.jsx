import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import Form from './components/form'
import Modal from './components/modal'

import Event from './components/event_form'
import ToggleButton from './components/event_button'
import Registration from './components/registration'
import Swipes from './components/swipes.jsx'
import EventList from './components/event_list'
import EventCurrent from './components/event_current'


class App extends Component {
constructor(props) {
  super(props)
  this.state = {
    data: [],
      category: '',
      radius: 0,
      latitude: 0,
      longitude: 0,
      isModalOpen: false,
      username: '',
      email: '',
      password: '',
      users: [],
      create: false,
     events: [],
     currentEventUser:[],
     eventRestaurant: 0,
     eventName: '',
     description: '',
     start: 0,
     end: 0,
  };
}

getRegistration(e) {
  console.log(e.target.username.value)
  e.preventDefault();
  this.setState({
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
    isModalOpen: false
  });
  // User Registration form data
    fetch(`http://localhost:8080/users/${e.target.username.value}/${e.target.email.value}/${e.target.password.value}`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ users: data})
      console.log(data)
    })
    .catch(err => console.log(err))
  };

  componentDidMount() {

  }

  getEventInput(e){
     e.preventDefault();
     console.log(e.target.eventName.value)
     console.log(e.target.description.value)
     console.log(e.target.restaurantName.value)
     this.setState({
       eventName: e.target.eventName.value,
       restaurantName: e.target.restaurantName.value,
       description: e.target.description.value,
       start: e.target.start.value,
       end: e.target.end.value,
     })

   fetch(`http://localhost:8080/events/${e.target.eventName.value}/${e.target.restaurantName.value}/${e.target.description.value}/${e.target.start.value}/${e.target.end.value}` , {
     method: "POST" ,
     // credentials: "include",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({
         eventName: e.target.eventName.value,
         restaurantName: e.target.restaurantName.value,
         description: e.target.description.value,
         start: e.target.start.value,
         end: e.target.end.value,
          })
     })
      .then(res => res.json())
     .then(data => {
       this.setState({ events: data})

     })
     .catch(err => console.log(err))
   };



// Set preferences for Eat-up search
getUserInput = (e) => {
 e.preventDefault();
 this.setState({
   category: e.target.category.value,
   radius: e.target.radius.value
 });

    fetch(`http://localhost:8080/api/search/${e.target.category.value}/${e.target.radius.value}/${this.state.latitude}/${this.state.longitude}`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        category: e.target.category.value,
        radius: e.target.radius.value
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ data: data})
      console.log(data)
    })
    .catch(err => console.log(err))
  };

  // Set local browsers geo-cordinates
  geoFindMe() {
    var output = document.getElementById("out");
    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }
    var success = (position) => {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      this.setState({latitude: latitude, longitude: longitude});

      // output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
      console.log(longitude)
      console.log(latitude)
    }
    function error() {
      output.innerHTML = "Unable to retrieve your location";
    }
    // output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
  }

// Login pop-up
 openModal() {
      this.setState({ isModalOpen: true })
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }

    handleEventClick = () => {
   console.log('clicked')
   this.setState({
     create: true,

   })
 }

  render() {
    return (
      <div className="Eat-Up">

          <header className="App-header">
            <h1 className="App-title">Eat-up</h1>

              <div>
                <button onClick={() => this.openModal()}>Registration</button>
                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                  <Registration getRegistration = {(e)=>this.getRegistration(e)}/>
                  <p><button onClick={() => this.closeModal()}>Close</button></p>
                </Modal>
              </div>
              <br></br>
              <div>
                <button onClick={() => this.openModal()}>Login</button>
                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                </Modal>
              </div>
          </header>
          <div classname="Geo-finder">
            {this.geoFindMe()}
          </div>

          <div className="eventList">
         <EventList/>
         </div>

        <div>
          {!this.state.category && <Form getUserInput = {this.getUserInput}/>}
        </div>

        <div>
         {this.state.create && <Event getEventInput = {(e) => this.getEventInput(e)}/>}
       </div>

       <div>
        {this.state.eventName && <EventCurrent/>}
       </div>

      <div>
        {!this.state.create && <Swipes data = {this.state.data} />}
    </div>

    <div className="ToggleButton">
     {this.state.category&&<ToggleButton create={this.state.create} eventRestaurant={this.state.eventRestaurant} handleClick={this.handleEventClick}/>}
     </div>

    </div>
  );
}
}

export default App;
