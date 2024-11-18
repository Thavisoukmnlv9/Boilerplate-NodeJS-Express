import app from "./app";
import env from "./env";
import logger from "./middleware/logger/config";

const server = app.listen(env.NODE_PORT, env.HOST, () => {
  logger.info("Started", `Listening on ${env.HOST}:${env.NODE_PORT}`);
});

for (const signal of ["SIGINT", "SIGBREAK", "SIGTERM"]) {
  process.on(signal, () => {
    logger.info(`${signal} signal received.`);
    logger.info("Closing http server.");
    server.close(() => {
      logger.info("Http server closed.");
      process.exit(0);
    });
  });
}
