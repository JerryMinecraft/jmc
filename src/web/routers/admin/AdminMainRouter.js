import express from 'express';

import PermissionRouter from './AdminPermissionsRouter.js';

const router = express.Router();

router.use('/permissions', PermissionRouter);

export default router;