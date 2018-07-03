import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import Form from './components/form'
import Modal from './components/modal'
import Registration from './components/registration'
import Swipes from './components/swipes.jsx'

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

        <div>
          <Form getUserInput = {this.getUserInput}/>
        </div>

      <div id="out"></div>

      <div>
        <Swipes data = {this.state.data} />
    </div>

    </div>
  );
}
}

export default App;
