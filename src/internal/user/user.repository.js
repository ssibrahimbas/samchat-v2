const UserSchema = require("./user.schema");

const create = async ({ username, email, password, avatar }) => {
  return UserSchema.create({ username, email, password, avatar });
};

const getById = async ({ id }) => {
  return UserSchema.findById(id);
};

const getByUsername = async ({ username }) => {
  return UserSchema.findOne({ username });
};

module.exports = {
  create,
  getById,
  getByUsername,
};
