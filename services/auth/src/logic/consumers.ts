// consumers.ts
import {
  UserCreatedEventType,
  NewPasswordSetEventType,
  OAuthLinkedEventType,
  AuthMethodAddedEventType,
} from 'events-tomeroko3';

import { usersCollection } from '../configs/mongoDB/initialization';

export const handleUserCreatedEvent = async (user: UserCreatedEventType['data']) => {
  await usersCollection.insertOne(user);
};

export const handleNewPasswordSetEvent = async (event: NewPasswordSetEventType['data']) => {
  const { userID, passwordHash } = event;
  await usersCollection.updateOne({ ID: userID }, { $set: { passwordHash } });
};

export const handleOAuthLinkedEvent = async (event: OAuthLinkedEventType['data']) => {
  const { userID, provider, providerID } = event;
  await usersCollection.updateOne(
    { ID: userID },
    { $push: { oauthProviders: { provider, providerID } } },
  );
};

export const handleAuthMethodAddedEvent = async (event: AuthMethodAddedEventType['data']) => {
  const { userID, authMethod } = event;
  await usersCollection.updateOne({ ID: userID }, { $push: { authMethods: authMethod } });
};
