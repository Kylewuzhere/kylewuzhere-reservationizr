const express = require("express");
const cors = require("cors");
const { celebrate, errors, Segments } = require("celebrate");
const RestaurantModel = require("./models/RestaurantModel");
const ReservationModel = require("./models/ReservationModel");
const reserveValidSchema = require("./models/reserveValidSchema");
const validId = require("./utils/validId");
const app = express();

app.use(cors());
app.use(express.json());

app.post(
  "/reservations",
  celebrate({ [Segments.BODY]: reserveValidSchema }),
  async (req, res, next) => {
    try {
      const { body } = req;
      const reservation = new ReservationModel(body);
      await reservation.save();
      res.status(201).send(reservation);
    } catch (err) {
      err.status = 400;
      next(err);
    }
  }
);

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

app.use(errors());

module.exports = app;
