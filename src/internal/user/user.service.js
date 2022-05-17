const UserRepository = require("./user.repository");

const login = async ({ username, password }) => {
  const user = await UserRepository.getByUsername({ username });
  if (!user) throw new Error("User not found.");
  const compare = user.comparePasswords(password);
  if (!compare) throw new Error("Wrong password.");
  return {
    success: true,
    message: "Login successfully.",
    data: {
      token: user.generateToken(),
      user,
    },
  };
};

const register = async ({ username, email, password, avatar }) => {
  const user = await UserRepository.create({
    username,
    email,
    password,
    avatar,
  });
  return {
    success: true,
    message: "Register successfully.",
    data: {
      token: user.generateToken(),
      user,
    },
  };
};

module.exports = {
  login,
  register,
};
