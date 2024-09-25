// availabilities.ts (message queue events names)
export const availabilitiesEventsNames = {
  DEFAULT_SCHEDULE_SET: 'DEFAULT_SCHEDULE_SET',
  WEEKLY_SCHEDULE_UPDATED: 'WEEKLY_SCHEDULE_UPDATED',
  AVAILABLE_NOW_STATUS_CHANGED: 'AVAILABLE_NOW_STATUS_CHANGED',
  AVAILABILITY_UPDATED: 'AVAILABILITY_UPDATED',
  AVAILABILITY_BLOCK_FULL: 'AVAILABILITY_BLOCK_FULL',
  AVAILABILITY_BLOCK_AVAILABLE: 'AVAILABILITY_BLOCK_AVAILABLE',
} as const;