import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <div>
      <header className="App-header">
        <h1 className="App-title">Eat-up</h1>
        <button>Login</button>
        <button>Sign-Up</button>
      </header>
      </div>
    );
  }
};

export default Navbar;
