const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Oks Ade",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Oks Ade",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Here is some useful information Page",
    name: "Oks Ade",
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  } else {
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = { }) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.addre,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    name: "Oks Ade",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
    name: "Oks Ade",
    title: "404",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
