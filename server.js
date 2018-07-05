const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const cors = require('cors')
var cookieSession = require('cookie-session')
const client = yelp.client("hxp7yqGWKyaIvgLRT0d4946GZRAKUxCTJy3mHGG0Es-UpLfc71F-BAWXWwFOLipfLZTPIUf3qw3cB8HXndgyok_pkQhW19SUaU0d72IDXrzqtOJRd1UMpfn4byg1W3Yx");
const app = express();
const configuration = require('./knexfile.js')['development']
const knex = require('knex')(configuration);

app.use(cors());
app.use(bodyParser.json())

app.use(cookieSession({
  name: "session",
  keys: ["dgs"] //secret key
}));


const port = process.env.PORT || 8080;

app.post('/users/login', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log('username', req.body.username)
  console.log('email', req.body.email)
  console.log('pass', req.body.password)

  if (req.body.email === "" || req.body.password === "" || req.body.username === "") {
    return res.status(403).send("Error: Email or Password is empty")
  } else {

    return knex('users').where({
      email: req.body.email,
      password: req.body.password,
      name: req.body.username
    }).then(function(data){
      console.log('found user', data)
      //below?? not defined
      //req.session.user_id = id;
      const currentUser = {
        username : username,
        email : email,
        password: password
      };
      return res.status(200).send(JSON.stringify(currentUser));
    })


    res.status(403).send("Error: Email or Password is incorrect")
  }

});

app.post("/users/logout", (req, res) => {
  console.log('logging out on server');
  req.session = null;
  res.redirect("/");
});


//To connect to real database:
app.post('/users/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (req.body.email === "" || req.body.password === ""){
      return res.status(400).send("Error: Email or Password Field is Empty")
    } else {

      knex('users')
     .returning('id')
     .insert([{
       name: req.body.username,
       email: req.body.email,
       password: req.body.password
     }])
     .then(function(id) {
       req.session.user_id = id;
       const currentUser = {
        username : username,
        email : email,
        password: password
      };
      res.status(200).send(JSON.stringify(currentUser));

     })
     .catch(function(error) {

      //need to fix this later to send right error message
      //res.status(400).send("Error: That email/username already exists. Please Try again!")

       console.error('Error:', error);
     });
  }

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
     console.log(businesses)
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

//login/logout/register func w/db
//sessions working properly
//

