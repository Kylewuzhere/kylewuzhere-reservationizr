const { isValid } = require("mongoose").Types.ObjectId;

const validId = (id) => {
  return isValid(id);
};

module.exports = validId;
