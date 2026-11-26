import "dotenv/config";
import jwt from "jsonwebtoken";
import { config } from "./src/config/env.config.js";

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

console.log(token);
