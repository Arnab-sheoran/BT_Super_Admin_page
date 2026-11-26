import { Router } from 'express';
import { SiteController } from '../controllers/site.controller.js';
import { authenticate, authorizeSuperAdmin } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { query, param } from 'express-validator';

const router = Router();
const siteController = new SiteController();

const siteListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().isString().trim().isLength({ min: 1, max: 100 }).withMessage('Search query must be 1-100 characters'),
  query('status').optional().isIn(['Active', 'InActive']).withMessage('Status must be Active or InActive'),
  query('sitetype').optional().isString().trim(),
  query('process_status').optional().isIn(['TBD', 'Initiated', 'InProgress', 'Blocked', 'Error', 'Completed']).withMessage('Invalid process_status'),
  query('createdFrom').optional().isISO8601().withMessage('createdFrom must be a valid ISO 8601 date'),
  query('createdTo').optional().isISO8601().withMessage('createdTo must be a valid ISO 8601 date'),
  query('sortBy').optional().isIn(['sitename', 'site_url', 'sitetype', 'status', 'process_status', 'numberofPosts', 'posts_processed', 'createdAt', 'updatedAt']).withMessage('Invalid sortBy field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('sortOrder must be asc or desc'),
];

const siteIdValidation = [
  param('siteId').isMongoId().withMessage('Invalid Site ID format'),
];

router.use(authenticate);
router.use(authorizeSuperAdmin);

router.get('/count', siteController.getSiteCount);
router.get('/stats', siteController.getSiteStats);
router.get('/', siteListValidation, validate(siteListValidation), siteController.getSites);
router.get('/:siteId', siteIdValidation, validate(siteIdValidation), siteController.getSiteById);

export default router;