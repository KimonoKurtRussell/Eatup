import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import Form from './components/form'
import Navbar from './components/navbar'
import Modal from './components/modal'

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
  };
}

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

// Testing only function
  callApi = async () => {
    const response = await fetch('/api/search/:location/:category');
    const body = await response.json();
    console.log('BODY', body)
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

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
      this.setState({ response: data})
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  geoFindMe = () => {
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
  increment = (e) => {
    e.preventDefault()
    this.setState({
      current_card: this.state.current_card + 1
    });
  }

  decrease = (e) => {
   e.preventDefault()
   this.setState({
     current_card: this.state.current_card - 1
   });
 }

 openModal() {
      this.setState({ isModalOpen: true })
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }

  render() {
    return (
      <div className="Eat-Up">
        <input type='button' value='login' onClick={this.login}/>
        <Navbar />
          <div>
            <button onClick={() => this.openModal()}>Open modal</button>
            <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
              <h1>Modal title</h1>
              <p>hello</p>
              <p><button onClick={() => this.closeModal()}>Close</button></p>
            </Modal>
          </div>
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
