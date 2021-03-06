import React from 'react';

class Form extends React.Component {

 render() {
   return (
     <div className="getRestaurant">
      <form onSubmit= {this.props.getUserInput}>
      <input className="foodtype" type='text' name= 'category' placeholder='What are you in the mood for ?'/>
        <select className="distance" type='int' name='radius' required='true'>
            <option value="none" selected> Distance</option>
            <option value="500">Half a km</option>
            <option value="1000">1 km</option>
            <option value="1500">1.5 km</option>
            <option value="2000">2 km</option>
            <option value="2500">2.5 km</option>
            <option value="3000">3 km</option>
            <option value="4000">4 km</option>
            <option value="4500">4.5 km</option>
            <option value="5000">5 km</option>
            </select>
         <br></br>
        <button className='findRest'>Find Restaurants!</button>
      </form>
    </div>
   );
 }
};

export default Form;
