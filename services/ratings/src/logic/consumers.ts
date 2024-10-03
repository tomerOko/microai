// consumers.ts
import { UserCreatedEventType, UserUpdatedEventType, CallEndedEventType } from 'events-tomeroko3';
import { functionWrapper } from 'common-lib-tomeroko3';
import { usersCollection } from '../configs/mongoDB/initialization';
import { scheduleLongTermReviewReminder } from './service';

export const handleUserCreatedEvent = async (eventData: UserCreatedEventType['data']) => {
  return functionWrapper(async () => {
    await usersCollection.insertOne(eventData);
  });
};

export const handleUserUpdatedEvent = async (eventData: UserUpdatedEventType['data']) => {
  return functionWrapper(async () => {
    const { ID, ...update } = eventData;
    await usersCollection.updateOne({ ID }, { $set: update });
  });
};

export const handleCallEndedEvent = async (eventData: CallEndedEventType['data']) => {
  return functionWrapper(async () => {
    const { callID, studentID, consultantID } = eventData;
    // Schedule a reminder for the student to submit a long-term review after 2 weeks
    await scheduleLongTermReviewReminder({ callID, studentID, consultantID });
  });
};
