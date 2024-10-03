// router.ts

import { Auth, validateRequest } from 'common-lib';
import express from 'express';
import * as controller from './controller';
import { z } from 'zod';

export const router = express.Router();

// Get user notifications
router.get(
  '/notifications',
  Auth('LOGGED_IN'),
  validateRequest(
    {}, // No request validation needed
    z.array(
      z.object({
        notificationID: z.string(),
        content: z.string(),
        createdAt: z.string(),
        read: z.boolean(),
      })
    )
  ),
  controller.getNotifications
);

// Update user preferences
router.put(
  '/preferences',
  Auth('LOGGED_IN'),
  validateRequest(
    {
      body: z.object({
        preferences: z.record(z.string(), z.array(z.string())),
      }),
    },
    z.object({
      message: z.string(),
    })
  ),
  controller.updatePreferences
);
