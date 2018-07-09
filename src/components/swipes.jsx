import React from 'react';
import SwipeableViews from 'react-swipeable-views';



class Swipes extends React.Component {

constructor(props){
  super(props);

}

render (){
  return(
   <SwipeableViews enableMouseEvents onChangeIndex={this.props.getEventRestaurant}>

    {this.props.data.map((restaurant, i) => (
      <div className='restCard'>
        <div className= 'photo'>
          <img src={restaurant.image} alt={restaurant.name}/>
        </div>
        <div className='restInfo'>
        <h5>{restaurant.name}</h5>
        <h5>{restaurant.address}</h5>
        <h5>Phone: {restaurant.phone}</h5>
        <h5>Price: {restaurant.money}</h5>
        <h5>Rating: {restaurant.rating}</h5>
      </div>
      </div>

    ))}
    </SwipeableViews>
  );
}
};

export default Swipes;
