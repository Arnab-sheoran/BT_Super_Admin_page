import { Request, Response, NextFunction } from 'express';
import { SiteService, PaginatedSitesResponse } from '../services/site.services.js';
import { asyncHandler } from '../utils/async-handler.utils.js';
import { AppError } from '../utils/app-error.utils.js';
import { HTTP_STATUS } from '../constants/http-status.constants.js';

export class SiteController {
  private siteService: SiteService;

  constructor(siteService?: SiteService) {
    this.siteService = siteService ?? new SiteService();
  }

  getSiteCount = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const totalSites = await this.siteService.getSiteCount();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        totalSites,
      },
    });
  });

  getSites = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const search = req.query.search as string | undefined;
    const status = req.query.status as string | undefined;
    const sitetype = req.query.sitetype as string | undefined;
    const process_status = req.query.process_status as string | undefined;
    const createdFrom = req.query.createdFrom as string | undefined;
    const createdTo = req.query.createdTo as string | undefined;
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined;

    const result: PaginatedSitesResponse = await this.siteService.getSites({
      page,
      limit,
      search,
      status,
      sitetype,
      process_status,
      createdFrom: createdFrom ? new Date(createdFrom) : undefined,
      createdTo: createdTo ? new Date(createdTo) : undefined,
      sortBy,
      sortOrder,
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        sites: result.sites,
        pagination: result.pagination,
      },
    });
  });

  getSiteById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { siteId } = req.params;

    if (!siteId) {
      throw new AppError('Site ID is required', HTTP_STATUS.BAD_REQUEST, 'SITE_ID_REQUIRED');
    }

    try {
      const site = await this.siteService.getSiteById(siteId);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: {
          site,
        },
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Site not found') {
        throw new AppError('Site not found', HTTP_STATUS.NOT_FOUND, 'SITE_NOT_FOUND');
      }
      if (error instanceof Error && error.message === 'Site ID is required') {
        throw new AppError('Invalid Site ID', HTTP_STATUS.BAD_REQUEST, 'INVALID_SITE_ID');
      }
      throw error;
    }
  });

  getSiteStats = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const stats = await this.siteService.getSiteStats();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        stats,
      },
    });
  });
}