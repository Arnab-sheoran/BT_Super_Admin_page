import { SiteRepository, SiteListParams, SiteStats } from '../repositories/site.repository.js';

export interface PaginatedSitesResponse {
  sites: any[];
  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export class SiteService {
  private siteRepository: SiteRepository;

  constructor(siteRepository?: SiteRepository) {
    this.siteRepository = siteRepository ?? new SiteRepository();
  }

  async getSiteCount(): Promise<number> {
    return this.siteRepository.countAllSites();
  }

  async getSites(params: SiteListParams): Promise<PaginatedSitesResponse> {
    const validatedParams = this.validateAndNormalizeParams(params);

    const [result] = await Promise.all([
      this.siteRepository.getSites(validatedParams),
    ]);

    const { sites, total } = result;
    const { page, limit } = validatedParams;

    const totalPages = Math.ceil(total / limit);

    return {
      sites,
      pagination: {
        page,
        limit,
        totalRecords: total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async getSiteById(siteId: string) {
    if (!siteId || typeof siteId !== 'string') {
      throw new Error("Site ID is required");
    }

    const site = await this.siteRepository.getSiteById(siteId);

    if (!site) {
      throw new Error("Site not found");
    }

    return site;
  }

  async getSiteStats(): Promise<SiteStats> {
    return this.siteRepository.getSiteStats();
  }

  private validateAndNormalizeParams(params: SiteListParams): SiteListParams {
    let { page, limit, search, status, sitetype, process_status, createdFrom, createdTo, sortBy, sortOrder } = params;

    page = this.validatePage(page);
    limit = this.validateLimit(limit);

    if (search !== undefined) {
      search = this.validateSearch(search);
    }

    if (status !== undefined) {
      status = this.validateStatus(status);
    }

    if (sitetype !== undefined) {
      sitetype = this.validateSiteType(sitetype);
    }

    if (process_status !== undefined) {
      process_status = this.validateProcessStatus(process_status);
    }

    if (createdFrom !== undefined) {
      createdFrom = this.validateDate(createdFrom, 'createdFrom');
    }

    if (createdTo !== undefined) {
      createdTo = this.validateDate(createdTo, 'createdTo');
    }

    if (sortBy !== undefined) {
      sortBy = this.validateSortBy(sortBy);
    }

    if (sortOrder !== undefined) {
      sortOrder = this.validateSortOrder(sortOrder);
    }

    return {
      page,
      limit,
      search,
      status,
      sitetype,
      process_status,
      createdFrom,
      createdTo,
      sortBy,
      sortOrder,
    };
  }

  private validatePage(page: any): number {
    const parsed = parseInt(page, 10);
    if (isNaN(parsed) || parsed < 1) {
      throw new Error("Page must be a positive integer");
    }
    return parsed;
  }

  private validateLimit(limit: any): number {
    const parsed = parseInt(limit, 10);
    if (isNaN(parsed) || parsed < 1) {
      throw new Error("Limit must be a positive integer");
    }
    if (parsed > 100) {
      throw new Error("Limit cannot exceed 100");
    }
    return parsed;
  }

  private validateSearch(search: string): string {
    const trimmed = search.trim();
    if (trimmed.length === 0) {
      throw new Error("Search query cannot be empty");
    }
    if (trimmed.length > 100) {
      throw new Error("Search query too long");
    }
    return trimmed;
  }

  private validateStatus(status: string): string {
    const validStatuses = ['Active', 'InActive'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    return status;
  }

  private validateSiteType(sitetype: string): string {
    return sitetype.trim();
  }

  private validateProcessStatus(process_status: string): string {
    const validStatuses = ['TBD', 'Initiated', 'InProgress', 'Blocked', 'Error', 'Completed'];
    if (!validStatuses.includes(process_status)) {
      throw new Error(`Invalid process_status. Must be one of: ${validStatuses.join(', ')}`);
    }
    return process_status;
  }

  private validateDate(date: any, fieldName: string): Date {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      throw new Error(`Invalid ${fieldName} date format`);
    }
    return parsed;
  }

  private validateSortBy(sortBy: string): string {
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
    if (!allowedFields.includes(sortBy)) {
      throw new Error(`Invalid sortBy field. Must be one of: ${allowedFields.join(', ')}`);
    }
    return sortBy;
  }

  private validateSortOrder(sortOrder: string): 'asc' | 'desc' {
    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
      throw new Error("sortOrder must be 'asc' or 'desc'");
    }
    return sortOrder;
  }
}