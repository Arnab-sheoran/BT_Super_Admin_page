import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./src/config/database.js";

const checkData = async () => {
  try {
    await connectDatabase();
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    const sites = db.collection("sites");
    const count = await sites.countDocuments({});
    console.log("Total sites:", count);
    
    const sample = await sites.find({}).limit(3).toArray();
    console.log("Sample sites:", JSON.stringify(sample, null, 2));
    
    // Check distinct values
    const statuses = await sites.distinct("status");
    console.log("Distinct statuses:", statuses);
    
    const siteTypes = await sites.distinct("sitetype");
    console.log("Distinct sitetypes:", siteTypes);
    
    const processStatuses = await sites.distinct("process_status");
    console.log("Distinct process_statuses:", processStatuses);
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

checkData();
