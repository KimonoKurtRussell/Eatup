const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const cors = require('cors')
var cookieSession = require('cookie-session')
const client = yelp.client("hxp7yqGWKyaIvgLRT0d4946GZRAKUxCTJy3mHGG0Es-UpLfc71F-BAWXWwFOLipfLZTPIUf3qw3cB8HXndgyok_pkQhW19SUaU0d72IDXrzqtOJRd1UMpfn4byg1W3Yx");
const app = express();
const configuration = require('./knexfile.js')['development']
const knex = require('knex')(configuration);
const SocketServer = require('ws').Server;

app.use(cors());
app.use(bodyParser.json())

app.use(cookieSession({
  name: "session",
  keys: ["dgs"] //secret key
}));

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
 console.log('ip address', ip)
});

const port = process.env.PORT || 8080;


//returns all the current events in the db
app.get('/events', (req, res) => {
  knex.select("*")
  .from("events")
  .then(eventList => {
    console.log(eventList)
     res.json(eventList)
   })
});


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
      req.session.user_id = data.id;
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

//events route
app.post('/events/:eventName/:restaurantName/:restaurantAddress/:description/:start/:end', (req, res) => {
const eventName = req.params.eventName
const restaurantName = req.params.restaurantName
const description = req.params.description
const start = req.params.start
const end = req.params.end
const id = knex('events')
.returning('id')
.insert([{
  event_name: req.params.eventName,
  restaurant_name: req.params.restaurantName,
  restaurant_address: req.params.restaurantAddress,
  description: req.params.description,
  event_start: req.params.start,
  event_end: req.params.end
}]).then((data) => {
    knex.select('*')
   .from('events')
   .where('id', '=', data[0])
   .then(results => {
     console.log(results)
     res.json(results)
   })

});

// .catch(function(error) {
//   console.error("Error:",error);
// });
});

app.post('/api/search/:category/:radius/:latitude/:longitude', (req, res) => {
  const category = req.params.category
  const radius = req.params.radius
  const latitude = req.params.latitude
  const longitude = req.params.longitude
  client.search({
    latitude: latitude,
    longitude: longitude,
    categories: category,
    radius: radius
  }).then(response => {

 const businesses = response.jsonBody.businesses
     //console.log(businesses)
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


