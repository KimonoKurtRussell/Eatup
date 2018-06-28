import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/form'
import User from './components/user'

class App extends Component {
constructor(props) {
  super(props)
  this.state = {
    response: '',
    name: '',
    price: '',
    location: '',
    category: ''
  };
}

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/search');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getUserInfo = (e) => {
    console.log(e.target.name)
    e.preventDefault();
    this.setState({
      name: e.target.name.value,
      price: e.target.price.value,
      location: e.target.location.value,
      category: e.target.category.value
    });
    // Enter ajax post here
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
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;
