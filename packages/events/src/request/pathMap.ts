import { ZodSchema } from 'zod';
import {
  addAuthMethodRequestValidation,
  addAuthMethodResponseValidation,
  loginRequestValidation,
  loginResponseValidation,
  oauthLoginRequestValidation,
  oauthLoginResponseValidation,
  sendPincodeRequestValidation,
  sendPincodeResponseValidation,
  signupOAuthRequestValidation,
  signupOAuthResponseValidation,
  signupRequestValidation,
  signupResponseValidation,
  updatePasswordRequestValidation,
  updatePasswordResponseValidation,
  updateProfileRequestValidation,
  updateProfileResponseValidation,
} from './validation';
import {
  checkAvailabilityRequestValidation,
  checkAvailabilityResponseValidation,
  setDefaultScheduleRequestValidation,
  setDefaultScheduleResponseValidation,
  toggleAvailableNowRequestValidation,
  toggleAvailableNowResponseValidation,
  updateWeeklyScheduleRequestValidation,
  updateWeeklyScheduleResponseValidation,
} from './validation/availabilities';
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
  SEND_PINCODE: {
    path: '/send-pincode',
    method: 'post',
    requestValidation: sendPincodeRequestValidation,
    responseValidation: sendPincodeResponseValidation,
    service: servicesNames.signup,
  },
  SIGNUP: {
    path: '/signup',
    method: 'post',
    requestValidation: signupRequestValidation,
    responseValidation: signupResponseValidation,
    service: servicesNames.signup,
  },
  SIGNUP_OAUTH: {
    path: '/signup-oauth',
    method: 'post',
    requestValidation: signupOAuthRequestValidation,
    responseValidation: signupOAuthResponseValidation,
    service: servicesNames.signup,
  },
  ADD_AUTH_METHOD: {
    path: '/add-auth-method',
    method: 'post',
    service: servicesNames.signup,
    requestValidation: addAuthMethodRequestValidation,
    responseValidation: addAuthMethodResponseValidation,
  },
  UPDATE_PROFILE: {
    path: '/update-profile',
    method: 'put',
    service: servicesNames.signup,
    requestValidation: updateProfileRequestValidation,
    responseValidation: updateProfileResponseValidation,
  },
  UPDATE_PASSWORD: {
    path: '/update-password',
    method: 'put',
    service: servicesNames.signup,
    requestValidation: updatePasswordRequestValidation,
    responseValidation: updatePasswordResponseValidation,
  },
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
    service: servicesNames.consultants,
    requestValidation: becomeConsultantRequestValidation,
    responseValidation: becomeConsultantResponseValidation,
  },
  UPDATE_CONSULTANT_PROFILE: {
    path: '/update-consultant-profile',
    method: 'put',
    service: servicesNames.consultants,
    requestValidation: updateConsultantProfileRequestValidation,
    responseValidation: updateConsultantProfileResponseValidation,
  },
  ADD_TOPIC: {
    path: '/add-topic',
    method: 'post',
    service: servicesNames.consultants,
    requestValidation: addTopicRequestValidation,
    responseValidation: addTopicResponseValidation,
  },
  UPDATE_TOPIC: {
    path: '/update-topic',
    method: 'put',
    service: servicesNames.consultants,
    requestValidation: updateTopicRequestValidation,
    responseValidation: updateTopicResponseValidation,
  },
  REMOVE_TOPIC: {
    path: '/remove-topic',
    method: 'delete',
    service: servicesNames.consultants,
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
  /**
   * Get User Connections
   * Retrieves all active WebSocket connections for a user, either as a student or consultant.
   */
  GET_USER_CONNECTIONS: {
    path: '/connections/:type',
    method: 'get',
    service: servicesNames.sockets,
    requestValidation: GetUserConnectionsRequestValidation,
    responseValidation: GetUserConnectionsResponseValidation,
  },

  SEND_MESSAGE: {
    path: '/messages',
    method: 'post',
    service: servicesNames.sockets,
    requestValidation: SendMessageRequestValidation,
    responseValidation: SendMessageResponseValidation,
  },

  /**
   * Disconnect User
   * Disconnects a user from a WebSocket session.
   */
  DISCONNECT: {
    path: '/disconnect',
    method: 'post',
    service: servicesNames.sockets,
    requestValidation: DisconnectRequestValidation,
    responseValidation: DisconnectResponseValidation,
  },
} as const;
