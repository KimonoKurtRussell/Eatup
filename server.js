const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const SocketServer = require('ws').Server
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

app.get('/cards', (req, res) => {
  knex.select("*")
  .from("events")
  .where("id", "=", "1")
  .then(results => {
    console.log(results)
    res.json({results: results})
  })
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

// WEB SOCKETS
const wss = new SocketServer({ port: 3001 });

wss.on('connection', (ws) => {
 console.log('Client connected');
 users = {
   type: "userCount",
   userCount: wss.clients.size
 };
 console.log(users)
 wss.clients.forEach(client => {
   client.send(JSON.stringify(users));
 });

 wss.clients.forEach(client => {
     client.send(JSON.stringify(wss.clients.size));
   })
 // Set up a callback for when a client closes the socket. This usually means they closed their browser.
 ws.on('close', () => console.log('Client disconnected'));
 users = {
      type: "userCount",
      userCount: wss.clients.size
    };
    wss.clients.forEach(client => {
     client.send(JSON.stringify(users));
    });
});

wss.on('connection', function connection(ws, req) {
 const ip = req.connection.remoteAddress;
 console.log(ip)
});

app.listen(port, () => console.log(`Listening on port ${port}`));
