import http, { Server } from "http";
import app from "./app";
import config from "./config";

const server: Server = http.createServer(app);

async function main() {
  try {
    server.listen(config.PORT, () => {
      console.log(`SERVER IS RUNNING ON http//:localhost:${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log("unhandledRejection is detected. shutting down server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaughtException is detected. shutting down server");
  process.exit(1);
});
