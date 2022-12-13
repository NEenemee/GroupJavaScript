let express = require("express");
let app = express();
const { response } = require("express");
const { querySql } = require("./mysql/queries");
app.listen(3000);
app.use(express.static(__dirname));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
  let countryQuery = querySql(
    `SELECT country AS options FROM restaurants GROUP BY country`
  );
  let cityQuery = querySql(
    `SELECT city AS options FROM restaurants GROUP BY city`
  );
  let cuisineQuery = querySql(
    `SELECT cuisine AS options FROM restaurants GROUP BY cuisine`
  );
  Promise.all([countryQuery, cityQuery, cuisineQuery]).then((sqlData) => {
    response.render("index", {
      title: "Resturant Search",
      countries: sqlData[0],
      cities: sqlData[1],
      cuisine: sqlData[2],
    });
  });
});
