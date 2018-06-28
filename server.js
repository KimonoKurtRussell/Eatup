const express = require('express');
const yelp = require('yelp-fusion');
const client = yelp.client("hxp7yqGWKyaIvgLRT0d4946GZRAKUxCTJy3mHGG0Es-UpLfc71F-BAWXWwFOLipfLZTPIUf3qw3cB8HXndgyok_pkQhW19SUaU0d72IDXrzqtOJRd1UMpfn4byg1W3Yx");

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get("/api/search", (req, res) => {
 client.search({
   title: "asian",
   location: "Toronto, on",
 }).then(response => {
   const businesseNames = response.jsonBody.businesses
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
