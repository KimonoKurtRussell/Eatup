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

// app.post('/api', (req, res) => {
//   const location = req.body.location
//   const category = req.body.category
//   console.log(location)
//   console.log(category)
//   res.json({ express: 'Hello From Express' });
// });

app.post("/api/search/:location/:category", (req, res) => {
const location = req.params.location
const category = req.params.category
console.log(location)
 client.search({
   // categories: category,
   location: location
 }).then(response => {
   const businesseNames = response.jsonBody.businesses
   console.log(businesseNames)
   res.send(getName(businesseNames));
 }).catch(e => {
   console.log(e);
 });
});

function getName(array) {
  var listOfRestaurants = [];
 for(var i = 0; i < array.length; i++){
   listOfRestaurants.push(array[i].name)
   // listOfRestaurants.push(array[i].coordinates)
   listOfRestaurants.push(array[i].categories[0].alias)
 }
 return listOfRestaurants;
}

app.listen(port, () => console.log(`Listening on port ${port}`));
