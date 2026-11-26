import { BlogSiteModel } from "../models/site.js";
import mongoose from "mongoose";

export interface SiteListParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sitetype?: string;
  process_status?: string;
  createdFrom?: Date;
  createdTo?: Date;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SiteStats {
  totalSites: number;
  byStatus: Record<string, number>;
  bySiteType: Record<string, number>;
  byProcessStatus: Record<string, number>;
  recentlyCreated: number;
}

export class SiteRepository {
  private siteModel: any;

  constructor() {
    const siteModelInstance = new BlogSiteModel(mongoose);
    this.siteModel = siteModelInstance.siteModel;
  }

  async countAllSites(): Promise<number> {
    return this.siteModel.countDocuments({});
  }

  async getSites(params: SiteListParams) {
    const { page, limit, search, status, sitetype, process_status, createdFrom, createdTo, sortBy, sortOrder } = params;

    const filter: any = {};

    if (search) {
      const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { sitename: searchRegex },
        { site_url: searchRegex },
        { _id: mongoose.Types.ObjectId.isValid(search) ? new mongoose.Types.ObjectId(search) : null },
      ].filter(Boolean);
    }

    if (status) {
      filter.status = status;
    }

    if (sitetype) {
      filter.sitetype = sitetype;
    }

    if (process_status) {
      filter.process_status = process_status;
    }

    if (createdFrom || createdTo) {
      filter.createdAt = {};
      if (createdFrom) filter.createdAt.$gte = createdFrom;
      if (createdTo) filter.createdAt.$lte = createdTo;
    }

    const skip = (page - 1) * limit;

    const sortField = sortBy && this.isValidSortField(sortBy) ? sortBy : 'createdAt';
    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    const sort: any = { [sortField]: sortDirection };

    const projection = "_id sitename site_url sitetype status process_status numberofPosts posts_processed createdAt updatedAt";

    const [sites, total] = await Promise.all([
      this.siteModel
        .find(filter)
        .select(projection)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.siteModel.countDocuments(filter),
    ]);

    return { sites, total };
  }

  async getSiteById(siteId: string) {
    if (!mongoose.Types.ObjectId.isValid(siteId)) {
      return null;
    }

    const projection = "_id sitename site_url sitetype homepage_url about_url status process_status numberofPosts posts_processed post_API_url ga_property_id site_features email_notifications security_alerts firstSubscriptionActivated createdAt updatedAt";

    return this.siteModel
      .findById(siteId)
      .select(projection)
      .lean()
      .exec();
  }

  async getSiteStats(): Promise<SiteStats> {
    const [
      totalSites,
      byStatus,
      bySiteType,
      byProcessStatus,
      recentlyCreated,
    ] = await Promise.all([
      this.siteModel.countDocuments({}),
      this.siteModel.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      this.siteModel.aggregate([
        { $group: { _id: '$sitetype', count: { $sum: 1 } } },
      ]),
      this.siteModel.aggregate([
        { $group: { _id: '$process_status', count: { $sum: 1 } } },
      ]),
      this.siteModel.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      }),
    ]);

    return {
      totalSites,
      byStatus: Object.fromEntries(byStatus.map((s: any) => [s._id, s.count])),
      bySiteType: Object.fromEntries(bySiteType.map((s: any) => [s._id, s.count])),
      byProcessStatus: Object.fromEntries(byProcessStatus.map((s: any) => [s._id, s.count])),
      recentlyCreated,
    };
  }

  private isValidSortField(field: string): boolean {
    const allowedFields = [
      'sitename',
      'site_url',
      'sitetype',
      'status',
      'process_status',
      'numberofPosts',
      'posts_processed',
      'createdAt',
      'updatedAt',
    ];
    return allowedFields.includes(field);
  }
}