import { ZodSchema } from 'zod';
import {
  loginRequestValidation,
  loginResponseValidation,
  oauthLoginRequestValidation,
  oauthLoginResponseValidation,
} from './validation';
import {
  addTopicRequestValidation,
  addTopicResponseValidation,
  becomeConsultantRequestValidation,
  becomeConsultantResponseValidation,
  removeTopicRequestValidation,
  removeTopicResponseValidation,
  updateConsultantProfileRequestValidation,
  updateConsultantProfileResponseValidation,
  updateTopicRequestValidation,
  updateTopicResponseValidation,
} from './validation/consultants';

const servicesNames = {
  availabilities: 'availabilities',
  auth: 'auth',
  call: 'call',
  chat: 'chat',
  consultants: 'consultants',
  meet: 'meet',
  notifications: 'notifications',
  paymnent: 'payment',
  search: 'search',
  signup: 'signup',
} as const;

export type ServiceName = (typeof servicesNames)[keyof typeof servicesNames];

export type Path = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  requestValidation: ZodSchema<any>;
  responseValidation: ZodSchema<any>;
  service: ServiceName;
};

export const pathMap = {
  LOGIN: {
    path: '/login',
    method: 'post',
    service: servicesNames.auth,
    requestValidation: loginRequestValidation,
    responseValidation: loginResponseValidation,
  },
  OAUTH_LOGIN: {
    path: '/oauth-login',
    method: 'post',
    service: servicesNames.auth,
    requestValidation: oauthLoginRequestValidation,
    responseValidation: oauthLoginResponseValidation,
  },
  BECOME_CONSULTANT: {
    path: '/become-consultant',
    method: 'post',
    service: servicesNames.consultant,
    requestValidation: becomeConsultantRequestValidation,
    responseValidation: becomeConsultantResponseValidation,
  },
  UPDATE_CONSULTANT_PROFILE: {
    path: '/update-consultant-profile',
    method: 'put',
    service: servicesNames.consultant,
    requestValidation: updateConsultantProfileRequestValidation,
    responseValidation: updateConsultantProfileResponseValidation,
  },
  ADD_TOPIC: {
    path: '/add-topic',
    method: 'post',
    service: servicesNames.consultant,
    requestValidation: addTopicRequestValidation,
    responseValidation: addTopicResponseValidation,
  },
  UPDATE_TOPIC: {
    path: '/update-topic',
    method: 'put',
    service: servicesNames.consultant,
    requestValidation: updateTopicRequestValidation,
    responseValidation: updateTopicResponseValidation,
  },
  REMOVE_TOPIC: {
    path: '/remove-topic',
    method: 'delete',
    service: servicesNames.consultant,
    requestValidation: removeTopicRequestValidation,
    responseValidation: removeTopicResponseValidation,
  },
  SET_DEFAULT_SCHEDULE: {
    path: '/set-default-schedule',
    method: 'post',
    service: servicesNames.availabilities,
    requestValidation: setDefaultScheduleRequestValidation,
    responseValidation: setDefaultScheduleResponseValidation,
  },
  UPDATE_WEEKLY_SCHEDULE: {
    path: '/update-weekly-schedule',
    method: 'put',
    service: servicesNames.availabilities,
    requestValidation: updateWeeklyScheduleRequestValidation,
    responseValidation: updateWeeklyScheduleResponseValidation,
  },
  TOGGLE_AVAILABLE_NOW: {
    path: '/toggle-available-now',
    method: 'post',
    service: servicesNames.availabilities,
    requestValidation: toggleAvailableNowRequestValidation,
    responseValidation: toggleAvailableNowResponseValidation,
  },
  CHECK_AVAILABILITY: {
    path: '/check-availability',
    method: 'get',
    service: servicesNames.availabilities,
    requestValidation: checkAvailabilityRequestValidation,
    responseValidation: checkAvailabilityResponseValidation,
  },
  SEARCH: {
    path: '/search',
    method: 'post',
    service: servicesNames.search,
    requestValidation: searchRequestValidation,
    responseValidation: searchResponseValidation,
  },
  GET_RECOMMENDATIONS: {
    path: '/recommendations',
    method: 'get',
    service: servicesNames.search,
    requestValidation: getRecommendationsRequestValidation,
    responseValidation: getRecommendationsResponseValidation,
  },
  CREATE_BOOKING: {
    path: '/create-booking',
    method: 'post',
    service: servicesNames.booking,
    requestValidation: createBookingRequestValidation,
    responseValidation: createBookingResponseValidation,
  },
  PROCESS_BOOKING_RESPONSE: {
    path: '/process-booking-response',
    method: 'post',
    service: servicesNames.booking,
    requestValidation: processBookingResponseRequestValidation,
    responseValidation: processBookingResponseResponseValidation,
  },
  RESCHEDULE_BOOKING: {
    path: '/reschedule-booking',
    method: 'put',
    service: servicesNames.booking,
    requestValidation: rescheduleBookingRequestValidation,
    responseValidation: rescheduleBookingResponseValidation,
  },
  CANCEL_BOOKING: {
    path: '/cancel-booking',
    method: 'delete',
    service: servicesNames.booking,
    requestValidation: cancelBookingRequestValidation,
    responseValidation: cancelBookingResponseValidation,
  },
  SEND_MESSAGE: {
    path: '/send-message',
    method: 'post',
    service: servicesNames.chat,
    requestValidation: sendMessageRequestValidation,
    responseValidation: sendMessageResponseValidation,
  },
  GET_CHAT_ROOM_MESSAGES: {
    path: '/chat-rooms/:chatRoomID/messages',
    method: 'get',
    service: servicesNames.chat,
    requestValidation: getChatRoomMessagesRequestValidation,
    responseValidation: getChatRoomMessagesResponseValidation,
  },
  GET_CHAT_ROOMS: {
    path: '/chat-rooms',
    method: 'get',
    service: servicesNames.chat,
    requestValidation: getChatRoomsRequestValidation,
    responseValidation: getChatRoomsResponseValidation,
  },
  GET_NOTIFICATIONS: {
    path: '/notifications',
    method: 'get',
    service: servicesNames.notifications,
    requestValidation: getNotificationsRequestValidation,
    responseValidation: getNotificationsResponseValidation,
  },
  MARK_NOTIFICATION_AS_READ: {
    path: '/notifications/mark-as-read',
    method: 'post',
    service: servicesNames.notifications,
    requestValidation: markNotificationAsReadRequestValidation,
    responseValidation: markNotificationAsReadResponseValidation,
  },
} as const;
