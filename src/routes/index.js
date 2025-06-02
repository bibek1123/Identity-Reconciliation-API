import express from 'express';
import identifyRoutes from './identifyRoutes.js'

const router = express.Router();

// identify routes
router.use('/identify', identifyRoutes);

export default router;
