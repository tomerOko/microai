import { ZodSchema } from 'zod';
import {
  addPaymentMethodRequestValidation,
  addPaymentMethodResponseValidation,
  addPayoutMethodRequestValidation,
  addPayoutMethodResponseValidation,
  addTopicRequestValidation,
  addTopicResponseValidation,
  becomeConsultantRequestValidation,
  becomeConsultantResponseValidation,
  cancelBookingRequestValidation,
  cancelBookingResponseValidation,
  checkAvailabilityRequestValidation,
  checkAvailabilityResponseValidation,
  createBookingRequestValidation,
  createBookingResponseValidation,
  endCallRequestValidation,
  endCallResponseValidation,
  getCallDetailsRequestValidation,
  getCallDetailsResponseValidation,
  getChatRoomMessagesRequestValidation,
  getChatRoomMessagesResponseValidation,
  getChatRoomsRequestValidation,
  getChatRoomsResponseValidation,
  getConsultantReviewsRequestValidation,
  getConsultantReviewsResponseValidation,
  getNotificationsResponseValidation,
  getOnlineUsersRequestValidation,
  getOnlineUsersResponseValidation,
  getRecommendationsRequestValidation,
  getRecommendationsResponseValidation,
  getTopicReviewsRequestValidation,
  getTopicReviewsResponseValidation,
  passwordLoginRequestValidation,
  passwordLoginResponseValidation,
  processBookingResponseRequestValidation,
  processBookingResponseResponseValidation,
  removePaymentMethodRequestValidation,
  removePaymentMethodResponseValidation,
  removePayoutMethodRequestValidation,
  removePayoutMethodResponseValidation,
  removeTopicRequestValidation,
  removeTopicResponseValidation,
  rescheduleBookingRequestValidation,
  rescheduleBookingResponseValidation,
  searchRequestValidation,
  searchResponseValidation,
  sendMessageRequestValidation,
  sendMessageResponseValidation,
  setDefaultScheduleRequestValidation,
  setDefaultScheduleResponseValidation,
  signupEmailRequestValidation,
  signupEmailResponseValidation,
  startCallRequestValidation,
  startCallResponseValidation,
  submitLongTermReviewRequestValidation,
  submitLongTermReviewResponseValidation,
  submitReviewRequestValidation,
  submitReviewResponseValidation,
  toggleAvailableNowRequestValidation,
  toggleAvailableNowResponseValidation,
  updateConsultantProfileRequestValidation,
  updateConsultantProfileResponseValidation,
  updatePaymentMethodRequestValidation,
  updatePaymentMethodResponseValidation,
  updatePayoutMethodRequestValidation,
  updatePayoutMethodResponseValidation,
  updateProfileRequestValidation,
  updateProfileResponseValidation,
  updateTopicRequestValidation,
  updateTopicResponseValidation,
  updateWeeklyScheduleRequestValidation,
  updateWeeklyScheduleResponseValidation,
  signupEmailPart2RequestValidation,
  signupEmailPart2ResponseValidation,
  deactivateUserRequestValidation,
  deactivateUserResponseValidation,
} from '../services';

const servicesNames = {
  availability: 'availability',
  auth: 'auth',
  booking: 'booking',
  call: 'call',
  chat: 'chat',
  consultant: 'consultant',
  meet: 'meet',
  notification: 'notification',
  payment: 'payment',
  search: 'search',
  signup: 'signup',
  review: 'review',
  send: 'send',
  socket: 'socket',
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
  PASSWORD_LOGIN: {
    path: '/login',
    method: 'post',
    service: servicesNames.auth,
    requestValidation: passwordLoginRequestValidation,
    responseValidation: passwordLoginResponseValidation,
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
    service: servicesNames.availability,
    requestValidation: setDefaultScheduleRequestValidation,
    responseValidation: setDefaultScheduleResponseValidation,
  },
  UPDATE_WEEKLY_SCHEDULE: {
    path: '/update-weekly-schedule',
    method: 'put',
    service: servicesNames.availability,
    requestValidation: updateWeeklyScheduleRequestValidation,
    responseValidation: updateWeeklyScheduleResponseValidation,
  },
  TOGGLE_AVAILABLE_NOW: {
    path: '/toggle-available-now',
    method: 'post',
    service: servicesNames.availability,
    requestValidation: toggleAvailableNowRequestValidation,
    responseValidation: toggleAvailableNowResponseValidation,
  },
  CHECK_AVAILABILITY: {
    path: '/check-availability',
    method: 'get',
    service: servicesNames.availability,
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
    service: servicesNames.notification,
    requestValidation: null,
    responseValidation: getNotificationsResponseValidation,
  },
  START_CALL: {
    path: '/start-call',
    method: 'post',
    service: servicesNames.call,
    requestValidation: startCallRequestValidation,
    responseValidation: startCallResponseValidation,
  },
  END_CALL: {
    path: '/end-call',
    method: 'post',
    service: servicesNames.call,
    requestValidation: endCallRequestValidation,
    responseValidation: endCallResponseValidation,
  },
  GET_CALL_DETAILS: {
    path: '/calls/:callID',
    method: 'get',
    service: servicesNames.call,
    requestValidation: getCallDetailsRequestValidation,
    responseValidation: getCallDetailsResponseValidation,
  },
  updatePreferences: {
    method: 'PUT',
    path: '/api/notifications/preferences',
    service: 'NOTIFICATIONS_SERVICE',
    description: 'Update user notification preferences',
  },
  ADD_PAYMENT_METHOD: {
    path: '/payment-methods',
    method: 'post',
    service: servicesNames.payment,
    requestValidation: addPaymentMethodRequestValidation,
    responseValidation: addPaymentMethodResponseValidation,
  },
  UPDATE_PAYMENT_METHOD: {
    path: '/payment-methods',
    method: 'put',
    service: servicesNames.payment,
    requestValidation: updatePaymentMethodRequestValidation,
    responseValidation: updatePaymentMethodResponseValidation,
  },
  REMOVE_PAYMENT_METHOD: {
    path: '/payment-methods',
    method: 'delete',
    service: servicesNames.payment,
    requestValidation: removePaymentMethodRequestValidation,
    responseValidation: removePaymentMethodResponseValidation,
  },
  ADD_PAYOUT_METHOD: {
    path: '/payout-methods',
    method: 'post',
    service: servicesNames.payment,
    requestValidation: addPayoutMethodRequestValidation,
    responseValidation: addPayoutMethodResponseValidation,
  },
  UPDATE_PAYOUT_METHOD: {
    path: '/payout-methods',
    method: 'put',
    service: servicesNames.payment,
    requestValidation: updatePayoutMethodRequestValidation,
    responseValidation: updatePayoutMethodResponseValidation,
  },
  REMOVE_PAYOUT_METHOD: {
    path: '/payout-methods',
    method: 'delete',
    service: servicesNames.payment,
    requestValidation: removePayoutMethodRequestValidation,
    responseValidation: removePayoutMethodResponseValidation,
  },
  SUBMIT_REVIEW: {
    path: '/submit-review',
    method: 'post',
    service: servicesNames.review,
    requestValidation: submitReviewRequestValidation,
    responseValidation: submitReviewResponseValidation,
  },
  SUBMIT_LONG_TERM_REVIEW: {
    path: '/submit-long-term-review',
    method: 'post',
    service: servicesNames.review,
    requestValidation: submitLongTermReviewRequestValidation,
    responseValidation: submitLongTermReviewResponseValidation,
  },
  GET_CONSULTANT_REVIEWS: {
    path: '/consultant-reviews',
    method: 'get',
    service: servicesNames.review,
    requestValidation: getConsultantReviewsRequestValidation,
    responseValidation: getConsultantReviewsResponseValidation,
  },
  GET_TOPIC_REVIEWS: {
    path: '/topic-reviews',
    method: 'get',
    service: servicesNames.review,
    requestValidation: getTopicReviewsRequestValidation,
    responseValidation: getTopicReviewsResponseValidation,
  },
  SIGNUP_EMAIL_PART1: {
    path: '/email-signup-part-1',
    method: 'post',
    service: servicesNames.signup,
    requestValidation: signupEmailRequestValidation,
    responseValidation: signupEmailResponseValidation,
  },
  SIGNUP_EMAIL_PART2: {
    path: '/email-signup-part-2',
    method: 'post',
    service: servicesNames.signup,
    requestValidation: signupEmailPart2RequestValidation,
    responseValidation: signupEmailPart2ResponseValidation,
  },
  UPDATE_PROFILE: {
    path: '/update',
    method: 'put',
    service: servicesNames.signup,
    requestValidation: updateProfileRequestValidation,
    responseValidation: updateProfileResponseValidation,
  },
  DEACTIVATE_USER: {
    path: '/deactivate',
    method: 'post',
    service: servicesNames.signup,
    requestValidation: deactivateUserRequestValidation,
    responseValidation: deactivateUserResponseValidation,
  },
  GET_ONLINE_USERS: {
    path: '/online-users',
    method: 'get',
    service: servicesNames.socket,
    requestValidation: getOnlineUsersRequestValidation,
    responseValidation: getOnlineUsersResponseValidation,
  },
} as const;
