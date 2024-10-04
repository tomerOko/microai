// router.ts
import express from 'express';
import * as controller from './controller';

export const router = express.Router();

/**
 * Test route to verify that the Send Service is operational.
 */
router.get('/test', controller.test);
