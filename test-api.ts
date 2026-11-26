import "dotenv/config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { connectDatabase } from "@/config/database.js";
import { config } from "@/config/env.config.js";

const testApi = async () => {
  try {
    await connectDatabase();
    
    const db = mongoose.connection.db;
    const users = db.collection("users");
    
    // Check for existing users
    const userList = await users.find({}).limit(5).toArray();
    console.log("Users:", JSON.stringify(userList, null, 2));
    
    // Generate a test token for SUPER_ADMIN
    const testUser = {
      userId: "test-super-admin",
      email: "superadmin@bluethyme.com",
      role: "SUPER_ADMIN",
    };
    
    const token = jwt.sign(testUser, config.JWT_ACCESS_SECRET, {
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUDIENCE,
      expiresIn: config.JWT_ACCESS_EXPIRY,
    });
    
    console.log("\nTest JWT Token:");
    console.log(token);
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

testApi();
