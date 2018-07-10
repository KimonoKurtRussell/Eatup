import React from 'react';
import SwipeableViews from 'react-swipeable-views';
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
     <div>
       <h5>{restaurant.name}</h5>
       <h5>{restaurant.address}</h5>
       <h5>Phone: {restaurant.phone}</h5>
       <h5>Price: {restaurant.money}</h5>
       <h5>Rating: {restaurant.rating}</h5>
       <img className="photo" src={restaurant.image} alt={restaurant.name}/>
     </div>

   ))}
   </BindKeyboardSwipeableViews>
 );
}
};

export default Swipes;