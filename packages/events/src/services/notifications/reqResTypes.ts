// notifications.ts (request and response types)
import * as z from 'zod';
import {
  getNotificationsRequestValidation,
  getNotificationsResponseValidation,
  markNotificationAsReadRequestValidation,
  markNotificationAsReadResponseValidation,
} from '../validation/notifications';

export type getNotificationsRequestType = z.infer<typeof getNotificationsRequestValidation>;
export type getNotificationsResponseType = z.infer<typeof getNotificationsResponseValidation>;

export type markNotificationAsReadRequestType = z.infer<typeof markNotificationAsReadRequestValidation>;
export type markNotificationAsReadResponseType = z.infer<typeof markNotificationAsReadResponseValidation>;

// Additional types
export type NotificationType = z.infer<typeof getNotificationsResponseValidation>['notifications'][0];
export type sendNotificationPropsType = {
  userID: string;
  type: string;
  data: any;
};
