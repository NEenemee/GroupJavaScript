
let express = require('express');
const { querySql } = require('./mysql/queries');
let app = express();
const mysql = require("./mysql/config.js");
app.use(express.static("public"));

app.listen(3000);
app.use(express.static(__dirname));
app.set("view engine", "ejs");

app.get("/countries", (request, response) => {
  let allData = ("SELECT * FROM restaurants WHERE country = ? LIMIT ?,?");
  let take = parseInt(request.query.take);
  let skip = parseInt(request.query.page) * take;
  let country = request.query.country;
  allData=  mysql.functions.format(allData, [country,skip, take]);
  allData = querySql(allData).then(result =>{
  response.json(result)
  })
});
app.get("/cities", (request, response) => {
  let allData = ("SELECT * FROM restaurants WHERE city = ? LIMIT ?,?");
  let take = parseInt(request.query.take);
  let skip = parseInt(request.query.page) * take;
  allData=  mysql.functions.format(allData, [request.query.city]);
  allData = querySql(allData).then(result =>{
  response.json(result)
  })
});
app.get("/cuisine", (request, response) => {
  let allData = ("SELECT * FROM restaurants WHERE cuisine = ? LIMIT ?,?");
  let take = parseInt(request.query.take);
  let skip = parseInt(request.query.page) * take;
  allData=  mysql.functions.format(allData, [request.query.cuisine]);
  allData = querySql(allData).then(result =>{
  response.json(result)
  })
});
app.get("/places", (request, response) => {
  let allData = ("SELECT * FROM restaurants ORDER BY name LIMIT ?,?");
  let take = parseInt(request.query.take);
  let skip = parseInt(request.query.page) * take;
  allData=  mysql.functions.format(allData, [skip, take]);
  allData = querySql(allData).then(result =>{
  response.json(result)
  })
});
app.get("/", (request, response) => {
  let countryQuery = ("SELECT country AS options FROM restaurants GROUP BY country ORDER BY country ");
  let cityQuery = (`SELECT city AS options FROM restaurants GROUP BY city ORDER BY city`);
  let cuisineQuery = ("SELECT cuisine AS options FROM restaurants GROUP BY cuisine ORDER BY cuisine");
  countryQuery = querySql(countryQuery);
  cityQuery = querySql(cityQuery);
  cuisineQuery = querySql(cuisineQuery);
  Promise.all([countryQuery,cityQuery,cuisineQuery]).then(sqlData => {
    response.render('index', { 
    title: 'Resturant Search', 
    countries: sqlData[0], 
    cities: sqlData[1],
    cuisine: sqlData[2], 
    });
  });
});

  