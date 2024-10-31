import { UserCreatedEventType, UserUpdatedEventType } from 'events-tomeroko3';

import { usersCollection } from '../configs/mongoDB/initialization';

import * as model from './dal';

export const handleUserCreatedEvent = async (user: UserCreatedEventType['data']) => {
  await model.createUser({
    email: user.email,
    hasedPassword: user.hashedPassword,
    ID: user.ID,
  });
};

export const handleUserUpdatedEvent = async (event: UserUpdatedEventType['data']) => {
  await model.updateUserByID(event.ID, event);
};
