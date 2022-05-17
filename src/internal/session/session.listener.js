const SessionService = require("./session.service");
const ErrorMiddleware = require("~/middlewares/error/error.middleware");

const join = (io, socket) => {
  socket.on(
    "session:checkStatus.v1",
    ErrorMiddleware.wrapper(checkStatus, socket)
  );
};

const checkStatus = async (socket, params, callback) => {
  if (!socket.authorized) throw new Error("Login required");
  if (!params || !callback || typeof params !== "object" || !params.userId)
    throw new Error("Parameter not retrieved");
  SessionService.updateLastSeen({ userId: socket.userId });
  const result = SessionService.isOnline({ userId });
  callback(result);
};

module.exports = {
  join,
};
