import React, { Component } from 'react';
import './App.css';
import Form from './components/form'
import Modal from './components/modal'
import Registration from './components/registration'
import Swipes from './components/swipes.jsx'
import Login from './components/login.jsx'

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
    };
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
      this.setState({currentUser: null});
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
      this.setState({ currentUser: data})
      console.log('App.jsx: logged in current user', data)
    })
    .catch(err => console.log("$$$$$$$Error:", err))

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
      this.setState({ currentUser: data})
      console.log('App.jsx: registered current user', data)
    })
    .catch(err =>
      console.log(err))
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

  render() {
    //console.log('currentUser', this.state.currentUser.email )
    return (
      <div className="Eat-Up">

    {this.state.currentUser && <div>Logged in as {this.state.currentUser.email}</div>}

          <header className="App-header">
            <h1 className="App-title">Eat-up</h1>

              <div>
                <button onClick={() => this.openRegistrationModal()}>Registration</button>
                <Modal isOpen={this.state.isRegistrationModalOpen} onClose={() => this.closeRegistrationModal()}>
                <p style={{color: 'black'}}>Registration</p>
                  <Registration getRegistration={(e)=>this.getRegistration(e)}/>
                  <p><button onClick={() => this.closeRegistrationModal()}>Close</button></p>
                </Modal>
              </div>

              <br></br>

              <div>
                <button onClick={() => this.openLoginModal()}>Login</button>
                <Modal isOpen={this.state.isLoginModalOpen} onClose={() => this.closeLoginModal()}>
                  <p style={{color: 'black'}}>Log in</p>
                  <Login getLogin={(e)=>this.getLogin(e)}/>
                   <p><button onClick={() => this.closeLoginModal()}>Close</button></p>
                </Modal>
              </div>
              <br></br>
              <div>
              <button onClick={(e)=>this.getLogout(e)}>Logout</button>
              </div>

          </header>
          <div className="Geo-finder">
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

// To do:
// dont show login button if the user is signed in
// Also if response is 403 use error messages for login/registration
//connect the userauth code to the database



