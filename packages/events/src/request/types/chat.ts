// chats.ts (request and response types)
import * as z from 'zod';
import {
  sendMessageRequestValidation,
  sendMessageResponseValidation,
  getChatRoomMessagesRequestValidation,
  getChatRoomMessagesResponseValidation,
  getChatRoomsRequestValidation,
  getChatRoomsResponseValidation,
} from '../validation/chats';

export type sendMessageRequestType = z.infer<typeof sendMessageRequestValidation>;
export type sendMessageResponseType = z.infer<typeof sendMessageResponseValidation>;

export type getChatRoomMessagesRequestType = z.infer<typeof getChatRoomMessagesRequestValidation>;
export type getChatRoomMessagesResponseType = z.infer<typeof getChatRoomMessagesResponseValidation>;

export type getChatRoomsRequestType = z.infer<typeof getChatRoomsRequestValidation>;
export type getChatRoomsResponseType = z.infer<typeof getChatRoomsResponseValidation>;
