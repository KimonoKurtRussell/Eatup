import React, { Component } from 'react';
// import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Form from './components/form'
import User from './components/user'

class App extends Component {
constructor(props) {
  super(props)
  this.state = {
    response: [],
    name: '',
    price: '',
    location: '',
    category: '',
    current_card: 0
  };
}

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/search/:location/:category');
    const body = await response.json();
    console.log('BODY', body)

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getUserInfo = (e) => {
    e.preventDefault();
    console.log(e.target.price.value)
    this.setState({
      name: e.target.name.value,
      price: e.target.price.value,
      location: e.target.location.value,
      category: e.target.category.value
    });

    fetch(`http://localhost:8080/api/search/${e.target.location.value}/${e.target.category.value}`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: e.target.name.value,
        price: e.target.price.value,
        location: e.target.location.value,
        category: e.target.category.value
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({response: data})
      console.log('data', data)
    })
    .catch(err => console.log(err))
  }

  increment = (e) => {
    e.preventDefault()
    this.setState({
      current_card: this.state.current_card + 1
    });
  }

  render() {
    return (
      <div className="Eat-Up">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <Form getUserInfo = {this.getUserInfo}/>
            <User
            name = {this.state.name}
            price = {this.state.price}
            location = {this.state.location}
            category = {this.state.category}
            />
        </div>
        <div>
          <button onClick={this.increment}>
            Next Option
          </button>
        </div>
        <div>
          {this.state.response.map((res, i) => (
        <div style={{display: i === this.state.current_card ? 'block' : 'none'}}>>
              <h5>{res.name}</h5>
              <h5>{res.rating}</h5>
              <p class="phone">{res.phone}</p>
              <img src={res.image} alt={res.name}  />
              <h5>LOCATION: {res.location}</h5>
       </div>
     ))};
       </div>
      </div>
    );
  }
}

export default App;
