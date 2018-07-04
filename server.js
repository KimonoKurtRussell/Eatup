const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const cors = require('cors')
var cookieSession = require('cookie-session')
const client = yelp.client("hxp7yqGWKyaIvgLRT0d4946GZRAKUxCTJy3mHGG0Es-UpLfc71F-BAWXWwFOLipfLZTPIUf3qw3cB8HXndgyok_pkQhW19SUaU0d72IDXrzqtOJRd1UMpfn4byg1W3Yx");
const app = express();

app.use(cors());
app.use(bodyParser.json())

app.use(cookieSession({
  name: "session",
  keys: ["dgs"] //secret key
}));

//temporary users database
const users = [];

const port = process.env.PORT || 8080;

//login route needs to be fixed/modified
app.post('/users/login', (req, res) => {
  if (req.body.email === "" || req.body.password === "" || req.body.username === "") {
    res.status(403).send("Error: Email or Password is empty")
  } else {
    for (i in users){
      if (req.body.email === users[i].email) {
        req.session.username = users[i].username;
        res.status(200).send(JSON.stringify(users[i]));
        return;
      }
    }
    res.status(403).send("Error: Email or Password is incorrect")
  }

});

app.post("/users/logout", (req, res) => {

  console.log('logging out on server');
  req.session = null;
  res.redirect("/");

});

app.post('/users/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

    if (req.body.email === "" || req.body.password === ""){
      return res.status(400).send("Error: Email or Password Field is Empty")
    } else {
      for (var i in users){
        if (req.body.email === users[i].email){
        return res.status(400).send("Error: That email already exists. Please Try again!")
        }
      }
    }
    //adding to temporary database
    const currentUser = {
      username : username,
      email : email,
      password: password
    };

    users.push(currentUser);
    req.session.username = username;
    res.status(200).send(JSON.stringify(currentUser));

    console.log('users array:', users)
    console.log(username)
    console.log(email)
    console.log(password)
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
//changed the register/login routes
