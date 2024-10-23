// types/sockets.ts
import * as z from 'zod';
import { getOnlineUsersRequestValidation, getOnlineUsersResponseValidation } from './reqResValidations';

export type GetOnlineUsersRequestType = z.infer<typeof getOnlineUsersRequestValidation>;
export type GetOnlineUsersResponseType = z.infer<typeof getOnlineUsersResponseValidation>;
