const express = require("express");
const cors = require("cors");
const RestaurantModel = require("./models/RestaurantModel");
const validId = require("./utils/validId");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (req, res) => {
  const restaurants = await RestaurantModel.find({});
  return res.status(200).send(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const { id } = req.params;

  if (validId(id)) {
    const restaurant = await RestaurantModel.findById(id);
    if (restaurant === null) {
      return res
        .status(404)
        .send("The restaurant trying to be retrieved does not exist");
    } else {
      res.status(200).send(restaurant);
    }
  } else {
    res.status(400).send("Invalid ID is provided");
  }
});

module.exports = app;
