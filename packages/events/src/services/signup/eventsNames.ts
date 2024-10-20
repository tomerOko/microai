// signup.ts (message queue events names)
export const signupEventsNames = {
  USER_CREATED: 'USER_CREATED',
  USER_UPDATED: 'USER_UPDATED',
  USER_DEACTIVATED: 'USER_DEACTIVATED',
  NEW_PASSWORD_SET: 'NEW_PASSWORD_SET',
  SEND_NOTIFICATION: 'SEND_NOTIFICATION',
} as const;
