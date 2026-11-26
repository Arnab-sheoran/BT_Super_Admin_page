import "dotenv/config";
import mongoose from "mongoose";

import { connectDatabase } from "./config/database.js";
import { SiteService } from "./services/site.services.js";

const testSiteService = async () => {
  try {
    await connectDatabase();

    const siteService = new SiteService();

    console.log("\n--- TEST 1: SITE COUNT ---");

    const totalSites = await siteService.getSiteCount();

    console.log("Total Sites:", totalSites);

    console.log("\n--- TEST 2: PAGINATION ---");

    const result = await siteService.getSites({ page: 1, limit: 5 });

    console.log("Sites returned:", result.sites.length);
    console.log("Pagination:", result.pagination);

    console.log("\n--- TEST 3: INVALID PAGE ---");

    try {
      await siteService.getSites({ page: 0, limit: 5 });
    } catch (error) {
      console.log("Expected error:", (error as Error).message);
    }

    console.log("\n--- TEST 4: INVALID LIMIT ---");

    try {
      await siteService.getSites({ page: 1, limit: 101 });
    } catch (error) {
      console.log("Expected error:", (error as Error).message);
    }

    console.log("\n--- TEST 5: SEARCH ---");

    try {
      const searchResult = await siteService.getSites({ page: 1, limit: 5, search: 'cooking' });
      console.log("Search results:", searchResult.sites.length);
      console.log("Search pagination:", searchResult.pagination);
    } catch (error) {
      console.log("Search error:", (error as Error).message);
    }

    console.log("\n--- TEST 6: FILTER BY STATUS ---");

    try {
      const filterResult = await siteService.getSites({ page: 1, limit: 5, status: 'Active' });
      console.log("Filter results:", filterResult.sites.length);
    } catch (error) {
      console.log("Filter error:", (error as Error).message);
    }

    console.log("\n--- TEST 7: FILTER BY SITE TYPE ---");

    try {
      const filterResult = await siteService.getSites({ page: 1, limit: 5, sitetype: 'Cooking' });
      console.log("Site type filter results:", filterResult.sites.length);
    } catch (error) {
      console.log("Site type filter error:", (error as Error).message);
    }

    console.log("\n--- TEST 8: FILTER BY PROCESS STATUS ---");

    try {
      const filterResult = await siteService.getSites({ page: 1, limit: 5, process_status: 'Completed' });
      console.log("Process status filter results:", filterResult.sites.length);
    } catch (error) {
      console.log("Process status filter error:", (error as Error).message);
    }

    console.log("\n--- TEST 9: SORTING ---");

    try {
      const sortResult = await siteService.getSites({ page: 1, limit: 5, sortBy: 'sitename', sortOrder: 'asc' });
      console.log("Sort results:", sortResult.sites.map((s: any) => s.sitename));
    } catch (error) {
      console.log("Sort error:", (error as Error).message);
    }

    console.log("\n--- TEST 10: SITE DETAILS ---");

    try {
      const firstSite = result.sites[0];
      if (firstSite) {
        const site = await siteService.getSiteById(firstSite._id.toString());
        console.log("Site details:", site.sitename, site.site_url, site.sitetype);
      }
    } catch (error) {
      console.log("Site details error:", (error as Error).message);
    }

    console.log("\n--- TEST 11: SITE NOT FOUND ---");

    try {
      await siteService.getSiteById('507f1f77bcf86cd799439011');
    } catch (error) {
      console.log("Expected error:", (error as Error).message);
    }

    console.log("\n--- TEST 12: SITE STATS ---");

    try {
      const stats = await siteService.getSiteStats();
      console.log("Stats:", JSON.stringify(stats, null, 2));
    } catch (error) {
      console.log("Stats error:", (error as Error).message);
    }

    console.log("\nService tests completed.");
  } catch (error) {
    console.error("Service test failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

testSiteService();