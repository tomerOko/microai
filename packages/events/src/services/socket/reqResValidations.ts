// validation/sockets.ts
import z from 'zod';

export const getOnlineUsersRequestValidation = z.object({
  query: z.object({}),
});

export const getOnlineUsersResponseValidation = z.object({
  users: z.array(
    z.object({
      ID: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      status: z.enum(['online', 'offline']),
    }),
  ),
});
