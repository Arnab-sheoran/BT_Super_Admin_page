
import "dotenv/config";

import app from "./app.js"
import mongoose from "mongoose";
import {connectDatabase} from "./config/database.js"

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {

    await connectDatabase();

    console.log("Database:", mongoose.connection.name);


    const server = app.listen(PORT, () => {
      console.log(
        `Command Centre Backend running on port ${PORT}`
      );
    });


    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

startServer();
