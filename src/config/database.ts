
import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_CONNECTION_URL;

  if (!mongoUri) {
    throw new Error("MONGODB_CONNECTION_URL is missing");
  }

  await mongoose.connect(mongoUri);

  console.log("MongoDB connected successfully");
  console.log(`Connected database: ${mongoose.connection.name}`);
};
