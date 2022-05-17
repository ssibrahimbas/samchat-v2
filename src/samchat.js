require("module-alias/register");
require("dotenv").config({
  path: __dirname + "/config/env/config.env",
});

const http = require("http");
const { Server } = require("socket.io");
const mongoDB = require("./db/mongo/mongoDB");
const ListenerDeployer = require("./listeners/listener.deployer");

const port = process.env.APP_PORT || 3000;

(async () => {
  await mongoDB.connect();
  const httpServer = http.createServer();
  const io = new Server(httpServer, {});

  io.on("connection", (socket) => {
    ListenerDeployer.deploy(io, socket);
  });
  httpServer.listen(port, () => {
    console.log("Server listening on port %s", port);
  });
})();
