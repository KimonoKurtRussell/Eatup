import React from 'react';

class User extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <p>{this.props.location}</p>
        <p>{this.props.price}</p>
        <p>{this.props.category}</p>
      </div>
    );
  }
};

export default User;
