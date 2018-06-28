import React from 'react';

class Form extends React.Component {

  render() {
    return (
      <div>
        <form onSubmit= {this.props.getUserInfo}>
          <input type='text' name='name' placeholder='name' />
          <input type='text' name='price' placeholder='price'/>
          <input type='text' name='location' placeholder='location'/>
          <input type='text' name='category' placeholder='category'/>
          <button>Get Info</button>
        </form>
      </div>
    );
  }
};

export default Form;
