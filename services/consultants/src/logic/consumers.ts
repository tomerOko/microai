// consumers.ts
import { UserCreatedEventType } from 'events-tomeroko3';

import { usersCollection } from '../configs/mongoDB/initialization';

export const handleUserCreatedEvent = async (user: UserCreatedEventType['data']) => {
  await usersCollection.insertOne(user);
};
