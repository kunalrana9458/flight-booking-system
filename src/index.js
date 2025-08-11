const express = require("express");
const { ServerConfig, Logger } = require("./config");

const apiRoutes = require("./routes");
const { RedisServer } = require("./config");
const { connectRedis } = RedisServer;

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

const startServer = async () => {
  try {
    await connectRedis();
    app.listen(ServerConfig.PORT, () => {
      console.log(
        `Successfully Started the server on PORT: ${ServerConfig.PORT}`
      );
    });
  } catch (error) {
    console.log("Failed to start the server", error);
    process.exit(1);
  }
};

startServer();
