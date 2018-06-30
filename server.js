const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const cors = require('cors')
const client = yelp.client("hxp7yqGWKyaIvgLRT0d4946GZRAKUxCTJy3mHGG0Es-UpLfc71F-BAWXWwFOLipfLZTPIUf3qw3cB8HXndgyok_pkQhW19SUaU0d72IDXrzqtOJRd1UMpfn4byg1W3Yx");
const app = express();

app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 8080;

app.post("/api/search/:location/:category", (req, res) => {
const location = req.params.location
const category = req.params.category
// console.log(location)
 client.search({
   categories: category,
   location: location
 }).then(response => {
   const businesses = response.jsonBody.businesses;
 const restaurantData = [];
 // console.log(response.jsonBody.businesses)


 businesses.map(business => {
   const data = {name: business.name,
     image: business.image_url,
     rating: business.rating,
     phone: business.phone,
     location: business.location.display_address,
     lat: business.coordinates.latitude,
     long: business.coordinates.longitude,
      money: business.price
   };
   restaurantData.push(data)
 })

 console.log('restaurantData', restaurantData);

  res.send(restaurantData);

}).catch(e => {
  console.log(e);
});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
