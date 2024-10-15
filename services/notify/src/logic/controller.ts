// controller.ts

import { Request, Response } from 'express';
import * as service from './service';
import { functionWrapper } from 'common-lib';
import { GetNotificationsRequestType, UpdatePreferencesRequestType } from './shared/types/notifications';
import { AppError } from 'common-lib';
import { appErrorCodes } from './appErrorCodes';

// Get user notifications
export const getNotifications = async (req: Request, res: Response) => {
  return functionWrapper(async () => {
    const userID = req.user.id;

    const notifications = await service.getUserNotifications(userID);

    res.status(200).json(notifications);
  }, req, res);
};

// Update user preferences
export const updatePreferences = async (req: Request, res: Response) => {
  return functionWrapper(async () => {
    const userID = req.user.id;
    const preferences = (req.body as UpdatePreferencesRequestType['body']).preferences;

    await service.updateUserPreferences(userID, preferences);

    res.status(200).json({ message: 'Preferences updated successfully' });
  }, req, res);
};
