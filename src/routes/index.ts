import { Router } from 'express';
import healthRoutes from './health.routes.js';
import siteRoutes from './site.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/sites', siteRoutes);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Command Centre API',
    version: '1.0.0',
    documentation: '/api-docs',
  });
});

export default router;