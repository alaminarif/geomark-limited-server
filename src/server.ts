/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    // console.log(envVars.DB_URL);
    await mongoose.connect(envVars.DB_URL);
    // await mongoose.connect(
    //   "mongodb+srv://server-starter-pack-basic-js:gwNyN68Oev3qm0Mo@cluster.bcdhu1u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
    // );

    console.log("Connected to DB!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to port ${envVars.PORT}`);

      // server = app.listen(5000, () => {
      //   console.log(`Server is listening to port 5000`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejecttion detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
