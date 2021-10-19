const express = require("express");
const cors = require("cors");
const RestaurantModel = require("./models/RestaurantModel");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (req, res) => {
  const restaurants = await RestaurantModel.find({});
  return res.status(200).send(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  const restaurant = await RestaurantModel.findById(id);
  return res.status(200).send(restaurant);
});

module.exports = app;
