// signup.ts (message queue events names)
export const signupEventsNames = {
  USER_CREATED: 'USER_CREATED',
  NEW_PASSWORD_SET: 'NEW_PASSWORD_SET',
  OAUTH_LINKED: 'OAUTH_LINKED',
  AUTH_METHOD_ADDED: 'AUTH_METHOD_ADDED',
  SEND_NOTIFICATION: 'SEND_NOTIFICATION',
} as const;
