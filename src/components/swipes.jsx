import React from 'react';
import SwipeableViews from 'react-swipeable-views';
// import NotFound from "./images/notfound.jpg"
import { bindKeyboard } from 'react-swipeable-views-utils';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

class Swipes extends React.Component {

constructor(props){
 super(props);

}

render (){
 return(
  <BindKeyboardSwipeableViews enableMouseEvents onChangeIndex={this.props.getEventRestaurant}>

   {this.props.data.map((restaurant, i) => (
     <div className="restCard">
     <div className="photo" >
      <img src={restaurant.image} alt="NotFound"/>
      <div className="overlap">
      <h2 className="rating">{restaurant.rating}</h2>
      </div>
     </div>

      <div className="restInfo">

       <h2>{restaurant.name}</h2>
       <div className="price">
       <h5>{restaurant.money}</h5>
       </div>


       <h3>{restaurant.address}</h3>
       <h3>{restaurant.city} , {restaurant.state}   {restaurant.country} </h3>
       <h5>{restaurant.phone}</h5>

       <p className="addressString">{restaurant.addressString}</p>
     </div>
     </div>

   ))}
   </BindKeyboardSwipeableViews>
 );
}
};

export default Swipes;
