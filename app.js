const express = require('express');

const hbs = require('hbs');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/about", (req, res) => {
  res.render("about");
})

app.get("/beers", (req, res) => {
  fetch("https://api.punkapi.com/v2/beers")
  .then((response) => response.json())
  .then((beers) => {
    res.render("beers", {beers})
  })
})

app.get("/random-beer", (req, res) => {
  fetch("https://api.punkapi.com/v2/beers/random")
  .then((response) => response.json())
  .then((randomBeer) => {
    res.render("random-beer", {randomBeer})
  })
})

app.listen(3000);
