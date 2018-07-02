import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import Form from './components/form'
import Modal from './components/modal'
import Registration from './components/registration'

class App extends Component {
constructor(props) {
  super(props)
  this.state = {
    response: [],
      category: '',
      radius: 0,
      current_card: 0,
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
  console.log("hello world")
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
getUserInput(e) {
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
      this.setState({ response: data})
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

      output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    }
    function error() {
      output.innerHTML = "Unable to retrieve your location";
    }
    output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
  }

// Flip cards that you don't like
  increment(e) {
    e.preventDefault()
    this.setState({
      current_card: this.state.current_card + 1
    });
  }

  decrease(e) {
   e.preventDefault()
   this.setState({
     current_card: this.state.current_card - 1
   });
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

        <div>
          <Form getUserInput = {this.getUserInput}/>
        </div>

        <div>
       {this.state.current_card < 19 &&
        <button onClick={this.increment}>
          Next Option
        </button>
        }
        {this.state.current_card > 0 &&
        <button onClick={this.decrease}>
         previous option
         </button>
       }
      </div>

      <p><button onClick={this.geoFindMe}>Use my location</button></p>

      <div id="out"></div>
      <div>
      {this.state.response.map((res, i) => (
          <div style={{display: i === this.state.current_card ? 'block' : 'none'}}>
            <h5>{res.name}</h5>
            <h5>{res.address}</h5>
            <h5>Phone: {res.phone}</h5>
            <h5>Price: {res.money}</h5>
            <h5>Rating: {res.rating}</h5>
            <h5>Lat: {res.latitude}</h5>
            <h5>Long: {res.longitude}</h5>
            <img src={res.image} alt={res.name}/>
          </div>
        ))}
    </div>

    </div>
  );
}
}

export default App;
