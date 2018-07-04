const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const cors = require('cors')
const client = yelp.client("hxp7yqGWKyaIvgLRT0d4946GZRAKUxCTJy3mHGG0Es-UpLfc71F-BAWXWwFOLipfLZTPIUf3qw3cB8HXndgyok_pkQhW19SUaU0d72IDXrzqtOJRd1UMpfn4byg1W3Yx");
const app = express();
const cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['secret'],
}));

const environment = process.env.NODE_ENV || 'development';
require('dotenv').config();
const configuration = require('./knexfile')[environment];    // require environment's settings from knexfile
const knex = require('knex')(configuration);



app.use(cors());
app.use(bodyParser.json())

const port = process.env.PORT || 8080;

//Register user
app.post('/users/:username/:email/:password', (req, res) => {
  knex('users')
  .returning('id')
  .insert([{
    name: req.params.username,
    email: req.params.email,
    password: req.params.password
  }])
  .then(function(id) {
    req.session.user_id = id;
  })
  .catch(function(error) {
    console.error("Error:",error);
  });
});

// Events
app.post('/events/:eventName/:restaurantName/:restaurantAddress/:description/:start/:end', (req, res) => {
 const eventName = req.params.eventName
 const restaurantName = req.params.restaurantName
 const description = req.params.description
 const start = req.params.start
 const end = req.params.end
 knex('events')
 .returning('id')
 .insert([{
   event_name: req.params.eventName,
   restaurant_name: req.params.restaurantName,
   restaurant_address: req.params.restaurantAddress,
   description: req.params.description,
   event_start: req.params.start,
   event_end: req.params.end
 }])
 .then(function() {
   console.log("worked")
 })
 .catch(function(error) {
   console.error("Error:",error);
 });
});

app.post('/api/search/:category/:radius/:latitude/:longitude', (req, res) => {
  const category = req.params.category
  const radius = req.params.radius
  const latitude = req.params.latitude
  const longitude = req.params.longitude
  console.log(latitude)
  console.log(longitude)
  client.search({
    latitude: latitude,
    longitude: longitude,
    categories: category,
    radius: radius
  }).then(response => {
 // console.log(response.jsonBody.businesses)

 const businesses = response.jsonBody.businesses

     const restaurantData = [];

     businesses.map(business => {
           const data = {
            name: business.name,
            image: business.image_url,
            address: business.location.display_address,
            phone:business.display_phone,
            money: business.price,
            rating: business.rating,
            latitude: business.coordinates.latitude,
            longitude: business.coordinates.longitude
          };
           restaurantData.push(data)

         })

        res.send(restaurantData);

      }).catch(e => {
        console.log(e);
      });

    });

app.listen(port, () => console.log(`Listening on port ${port}`));
