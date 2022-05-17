const UserService = require("./user.service");
const ErrorMiddleware = require("~/middlewares/error/error.middleware");

const join = (io, socket) => {
  socket.on("user:login.v1", ErrorMiddleware.wrapper(loginListener, socket));
  socket.on(
    "user:register.v1",
    ErrorMiddleware.wrapper(registerListener, socket)
  );
};

const registerListener = async (socket, params, callback) => {
  if (!params || !callback || typeof params !== "object")
    throw new Error("Parameter not retrieved");
  const result = await UserService.register(params);
  socket.authorized = true;
  socket.join(`user_${result.data.user.id}`);
  callback(result);
};

const loginListener = async (socket, params, callback) => {
  if (
    !params ||
    !callback ||
    typeof params !== "object" ||
    !params.username ||
    !params.password
  )
    throw new Error("Parameter not retrieved");
  const result = await UserService.login({
    username: params.username,
    password: params.password,
  });
  socket.authorized = true;
  socket.join(`user_${result.data.user.id}`);
  callback(result);
};

module.exports = {
  join,
};
