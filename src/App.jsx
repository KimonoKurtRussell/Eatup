import React, { Component } from 'react';
import './App.css';
import Form from './components/form'
import Modal from './components/modal'
import Registration from './components/registration'
import Swipes from './components/swipes.jsx'
import Login from './components/login.jsx'
import ToggleButton from './components/event_button'
import EventList from './components/event_list'
import EventCurrent from './components/event_current'
import Event from './components/event_form'

import SideNav1 from './images/sidenav1.jpg'
import MainNav from './images/mainnav.jpeg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
        category: '',
        radius: 0,
        latitude: 0,
        longitude: 0,
        isRegistrationModalOpen: false,
        isLoginModalOpen: false,
        username: '',
        email: '',
        password: '',
        currentUser: null,
        loggedin: false,
        users: [],
        create: false,
        events: null,
        eventRestaurant: null,
        eventName: '',
        description: '',
        start: 0,
        end: 0,
        activeUsers: 1,
        dbEventList: []
    };
  }

   componentDidMount() {
     this.List();
  }

  componentWillMount() {
    clearInterval(this.puller)
  }

    List = () => {
    console.log("going to display all events in db")
    fetch(`/events`, {
      method: "GET",
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ dbEventList: data})
      this.puller = setTimeout(this.List, 2 * 1000);
      console.log('Event list from db', data)
    })
    .catch(err => console.log("MyError:", err))
  }

  joinEvent = (idx) => {
    const obj = {
      events_id: idx,
      users_id: this.state.currentUser.id,
      currentUser: this.state.currentUser.username
    }
    console.log(this.state.currentUser, 'users')

    return fetch(`/joinEvent`, {
      method: "POST",
      headers: {
         'Content-type': 'application/json'
       },
      body: JSON.stringify(obj)
    })
  }

  leaveEvent = (idx) => {
  const obj = {
    events_id: idx,
    users_id: this.state.currentUser.id,
  }
  return fetch(`/leaveEvent`, {
    method: "POST",
    headers: {
       'Content-type': 'application/json'
     },
    body: JSON.stringify(obj)
  })
}

  getLogout() {
    console.log('logging out')
     // Here we are doing a post to the logout route in the server
    fetch(`/users/logout`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include',
    })
    .then(() => {
      this.setState({currentUser: null, loggedin: false});
      // If the session is successfully removed then set this.state.currentUser to null
    })
    .catch(err => console.log(err))
  };

  getLogin(e) {
    console.log('logging in')
    e.preventDefault();
    fetch(`/users/login`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ currentUser: data, loggedin: true, isLoginModalOpen: false})
      console.log('App.jsx: logged in current user', data)
    })
    .catch(err => console.log("$$MyError:", err))

  };

  getRegistration(e) {
    e.preventDefault();
    this.setState({
      isRegistrationModalOpen: false
    });

  // User Registration form data
    fetch(`/users/register`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ currentUser: data, loggedin: true})
      console.log('App.jsx: registered current user', data)
    })
    .catch(err =>
      console.log(err))
  };

//for event input
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
      restaurantAddress: e.target.restaurantAddress.value
    })

  fetch(`http://localhost:8080/events/${e.target.eventName.value}/${e.target.restaurantName.value}/${e.target.restaurantAddress.value}/${e.target.description.value}/${e.target.start.value}/${e.target.end.value}` , {
    method: "POST" ,
    // credentials: "include",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
        eventName: e.target.eventName.value,
        restaurantName: e.target.restaurantName.value,
        restaurantAddress: e.target.restaurantAddress.value,
        description: e.target.description.value,
        start: e.target.start.value,
        end: e.target.end.value,
         })
    })
     .then(res => res.json())
    .then(data => {
      this.setState({ events: data[0]})
      console.log('events back from server', this.state.events)

    })
    .catch(err => console.log(err))
  };

// Set preferences for Eat-up search
  getUserInput = (e) => {
   e.preventDefault();
   this.setState({
     category: e.target.category.value,
     radius: e.target.radius.value,
   });

    fetch(`/api/search/${e.target.category.value}/${e.target.radius.value}/${this.state.latitude}/${this.state.longitude}`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        category: e.target.category.value,
        radius: e.target.radius.value
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ data: data, eventRestaurant: data[0]})
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
      console.log(latitude)
      console.log(longitude)
    }
    function error() {
      output.innerHTML = "Unable to retrieve your location";
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

// Login/registration pop-up
    openRegistrationModal() {
      this.setState({ isRegistrationModalOpen: true })
    }

    openLoginModal() {
      this.setState({ isLoginModalOpen: true })
    }

  closeRegistrationModal() {
    this.setState({ isRegistrationModalOpen: false })
  }

  closeLoginModal() {
    this.setState({ isLoginModalOpen: false })
  }

  handleEventClick = () => {
    console.log('clicked')
    this.setState({
      create: true,
    })
  }

  handleGetSwipeIndex = (n) => {
    console.log('event clicked', n)
    this.setState({
      eventRestaurant:this.state.data[n]
    })
  }

onNavigateHome = () => {
  this.setState({
    data: [],
      category: '',
      radius: 0,
      create: false,
      events: null,
      eventRestaurant: null,
      eventName: '',
      description: '',
      start: 0,
      end: 0,
  })
}

  render() {
    //console.log('currentUser', this.state.currentUser.email )
    return (
      <body>
        <div>{this.geoFindMe()}</div>
      <div class="admin">
       <header class="admin__header">
        <a href="#" class="logo">
         <h1>Eatup</h1>
        </a>
         <div class="toolbar">
          <button class="btn btn--primary" onClick={this.onNavigateHome}>Preferences</button>
           {this.state.currentUser && <div>Logged in as {this.state.currentUser.username}</div>}
         <div>
           {!this.state.loggedin === true &&<button onClick={() => this.openRegistrationModal()}>Registration</button>}
            <Modal  isOpen={this.state.isRegistrationModalOpen} onClose={() => this.closeRegistrationModal()}>
             <p style={{color: 'black'}}>Registration</p>
              <Registration getRegistration={(e)=>this.getRegistration(e)}/>
               <p><button onClick={() => this.closeRegistrationModal()}>Close</button></p>
                </Modal>
         </div>
         <br></br>
           <div>
            {this.state.loggedin === false &&<button onClick={() => this.openLoginModal()}>Login</button>}
             <Modal isOpen={this.state.isLoginModalOpen} onClose={() => this.closeLoginModal()}>
              <p style={{color: 'black'}}>Log in</p>
               <Login getLogin={(e)=>this.getLogin(e)}/>
                <p><button onClick={() => this.closeLoginModal()}>Close</button></p>
             </Modal>
           </div>
           <br></br>
             {this.state.loggedin === true &&<button onClick={(e)=>this.getLogout(e)}>Logout</button>}
         </div>
       </header>
         <nav class="admin__nav" style={{backgroundImage: "url(" + SideNav1 + ")"}}>
          <div className="eventList">
           <EventList joinEvent={this.joinEvent} leaveEvent={this.leaveEvent} dbEventList={this.state.dbEventList} currentUser={this.state.currentUser}/>
          </div>
         </nav>
          <main className="admin__main" style={{backgroundImage: "url(" + MainNav + ")"}}>
           <div className="dashboard__item dashboard__item--full">

              <div >
                {!this.state.category && <Form getUserInput = {this.getUserInput}/>}
               </div>


              <div class="profile">

                <div>
                 {this.state.create && !this.state.eventName && <Event getEventInput = {(e) => this.getEventInput(e)} restaurant = {this.state.eventRestaurant}/>}
                </div>
                 <div>
                  {this.state.eventName && this.state.currentUser && this.state.events && <EventCurrent events={this.state.events} currentUser={this.state.currentUser.username} joinEvent={this.joinEvent} returnHome={this.onNavigateHome}/>}
                 </div>
                  <div>
                   {!this.state.create && <Swipes data = {this.state.data} getEventRestaurant = {this.handleGetSwipeIndex} />}
                  </div>
                   <div className="ToggleButton">
                    {this.state.category && this.state.currentUser && <ToggleButton create={this.state.create} currentUser={this.state.currentUser.username} handleClick={this.handleEventClick}/>}
                   </div>
                   </div>

                </div>
              </main>
             </div>
            </body>
 );
}
}

export default App;
