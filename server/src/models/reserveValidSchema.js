const Joi = require("joi");

const schema = Joi.object({
  partySize: Joi.number().min(1).required(),
  date: Joi.date().greater("now").required(),
  restaurantName: Joi.string().required(),
});

module.exports = schema;
