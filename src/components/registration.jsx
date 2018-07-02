import React from 'react';

class Registration extends React.Component {
render() {
  return (
    <div>
      <form onSubmit={(e) => this.props.getRegistration(e)} >
        <input type='text' name='username' placeholder='username' value={this.props.username}/><br></br>
        <input type='text' name='email' placeholder='email' value={this.props.email}/><br></br>
        <input type='text' name= 'password' placeholder='password' value={this.props.password}/><br></br>
        <button>Submit</button>
      </form>
    </div>

  );
 }
};

  export default Registration;
