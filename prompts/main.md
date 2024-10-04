please generate the 'Signup Service' code 

dont use placeholder functions!!! implement all of the logic yourself!

always write the complete code (dont use comments instead of code like 'paste the code here', instead of the actual code)

remember tomeroko3-events package validation files:
shared validations
request response validations
request response types
event names
event validations
event type
db validation
pathMaps

add comments to explain the bussines logic you chosen if needed

write the actual consumers logic.


dont forget that each service should handle new user creation and user update events from the 'signup' service!

This prompt contains the main files of a service (the 'Teach' service, created only as an example for the rest of the services) written correctly according to the project standards
along with MongoDB and RabbitMQ initializations, and 7 validation and types files from the shared validation package ('events-tomeroko3') each service will have his own 7 files inside the shared validation package. 
Your task is to generate similar files for each service i will ask you to, following the same standards, structure and validations, and aligning with the previously generated 'Teach' service code.

First, here are the main files of a service written correctly according to the project standards:
P
// consumers.ts
import { UserCreatedEventType } from 'events-tomeroko3';

import { usersCollection } from '../configs/mongoDB/initialization';

export const handleUserEvent = async (user: UserCreatedEventType['data']) => {
  usersCollection.insertOne(user);
};

// controller.ts
import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import {
  addTopicRequestType,
  addTopicResponseType,
  becomeTeacherRequestType,
  becomeTeacherResponseType,
  deleteTopicRequestType,
  deleteTopicResponseType,
  stopTeachRequestType,
  stopTeachResponseType,
  updateTeacherDetailsRequestType,
  updateTeacherDetailsResponseType,
  updateTopicRequestType,
  updateTopicResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      res.send('Test route');
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const becomeTeacher = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as becomeTeacherRequestType['body'];
      const result: becomeTeacherResponseType = await service.becemeTeacher(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateTeacherDetails = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updateTeacherDetailsRequestType['body'];
      const result: updateTeacherDetailsResponseType = await service.updateTeacherDetails(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const stopTeach = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as stopTeachRequestType['body'];
      const result: stopTeachResponseType = await service.stopTeach(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const addTopic = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as addTopicRequestType['body'];
      const result: addTopicResponseType = await service.addTopic(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updateTopicRequestType['body'];
      const result: updateTopicResponseType = await service.updateTopic(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as deleteTopicRequestType['body'];
      const result: deleteTopicResponseType = await service.deleteTopic(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';

import { Teacher, Topic, User, teachersCollection, topicsCollection, usersCollection } from '../configs/mongoDB/initialization';

export const createTeacher = async (teacher: OptionalID<Teacher>) => {
  return functionWrapper(async () => {
    const ID = await teachersCollection.insertOne(teacher);
    return ID;
  });
};

export const getTeacherByID = async (ID: string) => {
  return functionWrapper(async () => {
    const teacher = await teachersCollection.findOne({ ID });
    return teacher;
  });
};

export const getTeacherByUserID = async (userID: string) => {
  return functionWrapper(async () => {
    const teacher = await teachersCollection.findOne({ userID });
    return teacher;
  });
};

export const getTeachers = async (filter: Partial<Teacher>) => {
  return functionWrapper(async () => {
    const teachers = await teachersCollection.find(filter).toArray();
    return teachers;
  });
};

export const updateTeacherByID = async (ID: string, update: Partial<Teacher>) => {
  return functionWrapper(async () => {
    await teachersCollection.updateOne({ filter: { ID }, update, options: {} });
  });
};

export const deleteTeacherByID = async (ID: string) => {
  return functionWrapper(async () => {
    await teachersCollection.deleteOne({ ID });
  });
};

export const createUser = async (user: User) => {
  return functionWrapper(async () => {
    await usersCollection.insertOne(user);
  });
};

export const getUserByID = async (ID: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ ID });
    return user;
  });
};

export const getUsers = async (filter: Partial<User>) => {
  return functionWrapper(async () => {
    const users = await usersCollection.find(filter).toArray();
    return users;
  });
};

export const updateUserByID = async (ID: string, update: Partial<User>) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ filter: { ID }, update, options: {} });
  });
};

export const deleteUserByID = async (ID: string) => {
  return functionWrapper(async () => {
    await usersCollection.deleteOne({ ID });
  });
};

export const createTopic = async (topic: OptionalID<Topic>) => {
  return functionWrapper(async () => {
    const ID = await topicsCollection.insertOne(topic);
    return ID;
  });
};

export const getTopicByID = async (ID: string) => {
  return functionWrapper(async () => {
    const topic = await topicsCollection.findOne({ ID });
    return topic;
  });
};

export const getTopics = async (filter: Partial<Topic>) => {
  return functionWrapper(async () => {
    const topics = await topicsCollection.find(filter).toArray();
    return topics;
  });
};

export const updateTopicByID = async (ID: string, update: Partial<Topic>) => {
  return functionWrapper(async () => {
    await topicsCollection.updateOne({ filter: { ID }, update, options: {} });
  });
};

export const deleteTopicByID = async (ID: string) => {
  return functionWrapper(async () => {
    await topicsCollection.deleteOne({ ID });
  });
};

// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

const becomeTeacher = pathMap['BECOME_TEACHER'];
router.post(
  becomeTeacher.path,
  Auth('LOGGED_IN'),
  validateRequest(becomeTeacher.requestValidation, becomeTeacher.responseValidation),
  controller.becomeTeacher,
);

const updateTeacherDetails = pathMap['UPDATE_TEACHER_DETAILS'];
router.post(
  updateTeacherDetails.path,
  Auth('LOGGED_IN'),
  validateRequest(updateTeacherDetails.requestValidation, updateTeacherDetails.responseValidation),
  controller.updateTeacherDetails,
);

const stopTeach = pathMap['STOP_TEACH'];
router.post(
  stopTeach.path,
  Auth('LOGGED_IN'),
  validateRequest(stopTeach.requestValidation, stopTeach.responseValidation),
  controller.stopTeach,
);

const addTopic = pathMap['ADD_TOPIC'];
router.post(
  addTopic.path,
  Auth('LOGGED_IN'),
  validateRequest(addTopic.requestValidation, addTopic.responseValidation),
  controller.addTopic,
);

const updateTopic = pathMap['UPDATE_TOPIC'];
router.post(
  updateTopic.path,
  Auth('LOGGED_IN'),
  validateRequest(updateTopic.requestValidation, updateTopic.responseValidation),
  controller.updateTopic,
);

const deleteTopic = pathMap['DELETE_TOPIC'];
router.post(
  deleteTopic.path,
  Auth('LOGGED_IN'),
  validateRequest(deleteTopic.requestValidation, deleteTopic.responseValidation),
  controller.deleteTopic,
);

// service.ts
import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  addTopicRequestType,
  addTopicResponseType,
  becomeTeacherRequestType,
  becomeTeacherResponseType,
  deleteTopicRequestType,
  deleteTopicResponseType,
  stopTeachRequestType,
  stopTeachResponseType,
  updateTeacherDetailsRequestType,
  updateTeacherDetailsResponseType,
  updateTopicRequestType,
  updateTopicResponseType,
} from 'events-tomeroko3';

import {
  teacherCreatedPublisher,
  teacherDeactivatedPublisher,
  teacherUpdatedPublisher,
  topicCreatedPublisher,
  topicDeletedPublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const becemeTeacher = async (props: becomeTeacherRequestType['body']): Promise<becomeTeacherResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }
    const { email, firstName, lastName } = user;
    const teacherProps = { email, firstName, lastName, userID, ...props, isActive: true };
    const ID = await model.createTeacher(teacherProps);
    teacherCreatedPublisher({ ...teacherProps, ID });
    return { teacherID: ID };
  });
};

export const updateTeacherDetails = async (
  props: updateTeacherDetailsRequestType['body'],
): Promise<updateTeacherDetailsResponseType> => {
  return functionWrapper(async () => {
    const { teacherID, teacher: update } = props;
    const userID = getAuthenticatedID() as string;
    const teacher = await model.getTeacherByID(teacherID);
    if (!teacher) {
      throw new AppError(appErrorCodes.UPDATE_TEACHER_TEACHER_NOT_FOUND, { teacherID });
    }
    if (teacher.userID !== userID) {
      throw new AppError(appErrorCodes.UPDATE_TEACHER_WRONG_USER_ID, { teacherID, userID });
    }
    teacherUpdatedPublisher({ ...teacher, ...update });
    await model.updateTeacherByID(teacherID, update);
    return {};
  });
};

export const stopTeach = async (props: stopTeachRequestType['body']): Promise<stopTeachResponseType> => {
  return functionWrapper(async () => {
    const { teacherID } = props;
    const userID = getAuthenticatedID() as string;
    const teacher = await model.getTeacherByID(teacherID);
    if (!teacher) {
      throw new AppError(appErrorCodes.STOP_TEACH_TEACHER_NOT_FOUND, { teacherID });
    }
    if (teacher.userID !== userID) {
      throw new AppError(appErrorCodes.DEACTIVATED_TEACHER_WRONG_USER_ID, { teacherID, userID });
    }
    teacherDeactivatedPublisher({ teacherID });
    await model.updateTeacherByID(teacher.ID, { isActive: false });
    return {};
  });
};

export const addTopic = async (props: addTopicRequestType['body']): Promise<addTopicResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const teacher = await model.getTeacherByUserID(userID);
    if (!teacher) {
      throw new AppError(appErrorCodes.ADD_TOPIC_TEACHER_NOT_FOUND, { userID });
    }
    const topicProps = { ...props, teacherID: teacher.ID, isActive: true, userID };
    const ID = await model.createTopic(topicProps);
    topicCreatedPublisher({ ...topicProps, ID });
    return { topicID: ID };
  });
};

export const updateTopic = async (props: updateTopicRequestType['body']): Promise<updateTopicResponseType> => {
  return functionWrapper(async () => {
    const { topicID, topic: update } = props;
    const userID = getAuthenticatedID() as string;
    const topic = await model.getTopicByID(topicID);
    if (!topic) {
      throw new AppError(appErrorCodes.UPDATE_TOPIC_TOPIC_NOT_FOUND, { topicID });
    }
    if (topic.userID !== userID) {
      throw new AppError(appErrorCodes.UPDATE_TOPIC_WRONG_USER_ID, { topicID, userID });
    }
    await model.updateTopicByID(topicID, update);
    topicCreatedPublisher({ ...topic, ...update });
    return {};
  });
};

export const deleteTopic = async (props: deleteTopicRequestType['body']): Promise<deleteTopicResponseType> => {
  return functionWrapper(async () => {
    const { topicID } = props;
    const userID = getAuthenticatedID() as string;
    const topic = await model.getTopicByID(topicID);
    if (!topic) {
      throw new AppError(appErrorCodes.UPDATE_TOPIC_TOPIC_NOT_FOUND, { topicID });
    }
    if (topic.userID !== userID) {
      throw new AppError(appErrorCodes.UPDATE_TOPIC_WRONG_USER_ID, { topicID, userID });
    }
    await model.deleteTopicByID(topicID);
    topicDeletedPublisher({ topicID });
    return {};
  });
};

I have also added the initialization of the MongoDB collection of the service and the RabbitMQ initialization of the subscribers and consumers of the service so that you can learn the standards of this as well:

// MongoDB Initialization (initialization.ts for MongoDB)
import { CollectionInitializerProps, SafeCollection, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { teachDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { teacher, user, topic } = teachDbValidations;

export type User = z.infer<typeof user>;
export type Teacher = z.infer<typeof teacher>;
export type Topic = z.infer<typeof topic>;

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

const teachersInitializerProps: CollectionInitializerProps<Teacher> = {
  collectionName: 'teachers',
  documentSchema: teacher,
  indexSpecs: [
    { key: { email: 1 }, unique: true },
    { key: { userID: 1 }, unique: true },
  ],
};

const topicsInitializerProps: CollectionInitializerProps<Topic> = {
  collectionName: 'topics',
  documentSchema: topic,
  indexSpecs: [
    { key: { email: 1 }, unique: true },
    { key: { userID: 1 }, unique: true },
  ],
};

export let usersCollection: SafeCollection<User>;
export let teachersCollection: SafeCollection<Teacher>;
export let topicsCollection: SafeCollection<Topic>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
    teachersCollection = await collectionInitializer(teachersInitializerProps);
    topicsCollection = await collectionInitializer(topicsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await usersCollection.deleteMany({});
    await teachersCollection.deleteMany({});
    await topicsCollection.deleteMany({});
  });
};

// RabbitMQ Initialization (initialization.ts for RabbitMQ)
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  TeacherCreatedEventType,
  TeacherDeactivatedEventType,
  TeacherUpdatedEventType,
  TopicCreatedEventType,
  TopicDeletedEventType,
  TopicUpdatedEventType,
  UserCreatedEventType,
  signupEventsNames,
  teachEventsNames,
  teacherCreatedEventValidation,
  teacherDeactivatedEventValidation,
  teacherUpdateEventValidation,
  topicCreatedEventValidation,
  topicDeleteEventValidation,
  topicUpdateEventValidation,
  userCreatedEventValidation,
} from 'events-tomeroko3';

import { handleUserEvent } from '../../logic/consumers';

export let teacherCreatedPublisher: (teacher: TeacherCreatedEventType['data']) => void;
export let teacherDeactivatedPublisher: (teacher: TeacherDeactivatedEventType['data']) => void;
export let teacherUpdatedPublisher: (teacher: TeacherUpdatedEventType['data']) => void;
export let topicCreatedPublisher: (topic: TopicCreatedEventType['data']) => void;
export let topicDeletedPublisher: (topic: TopicDeletedEventType['data']) => void;
export let topicUpdatedPublisher: (topic: TopicUpdatedEventType['data']) => void;

const teacherCreatedPublisherParams: RabbitPublisherParams<TeacherCreatedEventType> = {
  eventName: teachEventsNames.TEACHER_CREATED,
  eventSchema: teacherCreatedEventValidation,
};

const teacherDeactivatedPublisherParams: RabbitPublisherParams<TeacherDeactivatedEventType> = {
  eventName: teachEventsNames.TEACHER_DEACTIVATED,
  eventSchema: teacherDeactivatedEventValidation,
};

const teacherUpdatedPublisherParams: RabbitPublisherParams<TeacherUpdatedEventType> = {
  eventName: teachEventsNames.TEACHER_UPDATED,
  eventSchema: teacherUpdateEventValidation,
};

const topicCreatedPublisherParams: RabbitPublisherParams<TopicCreatedEventType> = {
  eventName: teachEventsNames.TOPIC_CREATED,
  eventSchema: topicCreatedEventValidation,
};

const topicDeletedPublisherParams: RabbitPublisherParams<TopicDeletedEventType> = {
  eventName: teachEventsNames.TOPIC_DELETED,
  eventSchema: topicDeleteEventValidation,
};

const topicUpdatedPublisherParams: RabbitPublisherParams<TopicUpdatedEventType> = {
  eventName: teachEventsNames.TOPIC_UPDATED,
  eventSchema: topicUpdateEventValidation,
};

const userSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'TEACH_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(userSubscriberParams);
    teacherCreatedPublisher = await rabbitPublisherFactory(teacherCreatedPublisherParams);
    teacherDeactivatedPublisher = await rabbitPublisherFactory(teacherDeactivatedPublisherParams);
    teacherUpdatedPublisher = await rabbitPublisherFactory(teacherUpdatedPublisherParams);
    topicCreatedPublisher = await rabbitPublisherFactory(topicCreatedPublisherParams);
    topicDeletedPublisher = await rabbitPublisherFactory(topicDeletedPublisherParams);
    topicUpdatedPublisher = await rabbitPublisherFactory(topicUpdatedPublisherParams);
  });
};

Now, I will provide you with the 7 validation and types files of the 'Teach' service from the shared validation package ('events-tomeroko3'). 

// teach.ts (shared validations)
import z from 'zod';
import { countries, Country, Gender, genders, Language, languages } from '../dictionaries';

export const teacherValidationPropsMinimal = {
  age: z.number(),
  gender: z
    .string()
    .refine((value) => value in genders)
    .transform((value) => value as Gender),
  languages: z.array(
    z
      .string()
      .refine((value) => value in languages)
      .transform((value) => value as Language),
  ),
  country: z
    .string()
    .refine((value) => value in countries)
    .transform((value) => value as Country),
  profilePictureUrl: z.string().url(),
  aboutMe: z.string(),
};

export const teacherValidationProps = {
  ID: z.string(),
  userID: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  isActive: z.boolean(),
  ...teacherValidationPropsMinimal,
};

export const topicValidationPropsMinimal = {
  name: z.string(),
  description: z.string(),
  iconUrl: z.string().url(),
  minimalDurationMinutes: z.number(),
  hourlyRate: z.number(),
};

export const topicValidationProps = {
  ID: z.string(),
  teacherID: z.string(),
  userID: z.string(),
  isActive: z.boolean(),
  ...topicValidationPropsMinimal,
};

// teach.ts (request and response validations)
import { z } from 'zod';
import { teacherValidationPropsMinimal, topicValidationPropsMinimal } from '../../shared/validations/teach';

export const becomeTeacherRequestValidation = z.object({
  body: z.object(teacherValidationPropsMinimal),
});

export const becomeTeacherResponseValidation = z.object({
  teacherID: z.string(),
});

export const updateTeacherDetailsRequestValidation = z.object({
  body: z.object({
    teacherID: z.string(),
    teacher: z.object(teacherValidationPropsMinimal).partial(),
  }),
});

export const updateTeacherDetailsResponseValidation = z.object({});

export const stopTeachRequestValidation = z.object({
  body: z.object({
    teacherID: z.string(),
  }),
});

export const stopTeachResponseValidation = z.object({});

export const addTopicRequestValidation = z.object({
  body: z.object(topicValidationPropsMinimal),
});

export const addTopicResponseValidation = z.object({
  topicID: z.string(),
});

export const updateTopicRequestValidation = z.object({
  body: z.object({
    topicID: z.string(),
    topic: z.object(topicValidationPropsMinimal).partial(),
  }),
});

export const updateTopicResponseValidation = z.object({});

export const deleteTopicRequestValidation = z.object({
  body: z.object({
    topicID: z.string(),
  }),
});

export const deleteTopicResponseValidation = z.object({});

// teach.ts (request and response types)
import * as z from 'zod';
import {
  becomeTeacherRequestValidation,
  addTopicRequestValidation,
  addTopicResponseValidation,
  becomeTeacherResponseValidation,
  stopTeachRequestValidation,
  stopTeachResponseValidation,
  deleteTopicRequestValidation,
  deleteTopicResponseValidation,
  updateTeacherDetailsRequestValidation,
  updateTeacherDetailsResponseValidation,
  updateTopicRequestValidation,
  updateTopicResponseValidation,
} from '../validation/teach';

export type becomeTeacherRequestType = z.infer<typeof becomeTeacherRequestValidation>;
export type becomeTeacherResponseType = z.infer<typeof becomeTeacherResponseValidation>;

export type updateTeacherDetailsRequestType = z.infer<typeof updateTeacherDetailsRequestValidation>;
export type updateTeacherDetailsResponseType = z.infer<typeof updateTeacherDetailsResponseValidation>;

export type stopTeachRequestType = z.infer<typeof stopTeachRequestValidation>;
export type stopTeachResponseType = z.infer<typeof stopTeachResponseValidation>;

export type addTopicRequestType = z.infer<typeof addTopicRequestValidation>;
export type addTopicResponseType = z.infer<typeof addTopicResponseValidation>;

export type updateTopicRequestType = z.infer<typeof updateTopicRequestValidation>;
export type updateTopicResponseType = z.infer<typeof updateTopicResponseValidation>;

export type deleteTopicRequestType = z.infer<typeof deleteTopicRequestValidation>;
export type deleteTopicResponseType = z.infer<typeof deleteTopicResponseValidation>;

// teach.ts (message queue events validations)
import * as z from 'zod';
import { teacherValidationProps, topicValidationProps } from '../../shared/validations/teach';
import { teachEventsNames } from '../names';

export const teacherCreatedEventValidation = z.object({
  type: z.literal(teachEventsNames.TEACHER_CREATED),
  data: z.object(teacherValidationProps),
});

export const teacherUpdateEventValidation = z.object({
  type: z.literal(teachEventsNames.TEACHER_UPDATED),
  data: z.object(teacherValidationProps),
});

export const teacherDeactivatedEventValidation = z.object({
  type: z.literal(teachEventsNames.TEACHER_DEACTIVATED),
  data: z.object({
    teacherID: z.string(),
  }),
});

export const topicCreatedEventValidation = z.object({
  type: z.literal(teachEventsNames.TOPIC_CREATED),
  data: z.object(topicValidationProps),
});

export const topicUpdateEventValidation = z.object({
  type: z.literal(teachEventsNames.TOPIC_UPDATED),
  data: z.object(topicValidationProps),
});

export const topicDeleteEventValidation = z.object({
  type: z.literal(teachEventsNames.TOPIC_DELETED),
  data: z.object({
    topicID: z.string(),
  }),
});

// teach.ts (message queue events types)
import * as z from 'zod';
import {
  teacherCreatedEventValidation,
  teacherDeactivatedEventValidation,
  teacherUpdateEventValidation,
  topicCreatedEventValidation,
  topicDeleteEventValidation,
  topicUpdateEventValidation,
} from '../validations/teach';

export type TeacherCreatedEventType = z.infer<typeof teacherCreatedEventValidation>;
export type TeacherUpdatedEventType = z.infer<typeof teacherUpdateEventValidation>;
export type TeacherDeactivatedEventType = z.infer<typeof teacherDeactivatedEventValidation>;
export type TopicCreatedEventType = z.infer<typeof topicCreatedEventValidation>;
export type TopicUpdatedEventType = z.infer<typeof topicUpdateEventValidation>;
export type TopicDeletedEventType = z.infer<typeof topicDeleteEventValidation>;

// teach.ts (message queue events names)
export const teachEventsNames = {
  TEACHER_CREATED: 'TEACHER_CREATED',
  TEACHER_UPDATED: 'TEACHER_UPDATED',
  TEACHER_DEACTIVATED: 'TEACHER_DEACTIVATED',
  TOPIC_CREATED: 'TOPIC_CREATED',
  TOPIC_UPDATED: 'TOPIC_UPDATED',
  TOPIC_DELETED: 'TOPIC_DELETED',
} as const;

// teach.ts (db documents validation)
import { z } from 'zod';
import { teacherValidationProps, topicValidationProps, userValidationProps, userValidationWithoutPasswordProps } from '../shared';

export const teachDbValidations = {
  user: z.object(userValidationWithoutPasswordProps),
  teacher: z.object(teacherValidationProps),
  topic: z.object(topicValidationProps),
};

Lastly, here's the pathMap content (learn the structure, but do change the values to fit the new design as needed):

// pathMap.ts
import { ZodSchema } from 'zod';
import {
  becomeTeacherRequestValidation,
  becomeTeacherResponseValidation,
  stopTeachRequestValidation,
  loginRequestValidation,
  loginRespondValidation,
  sendPincodeRequestValidation,
  sendPincodeRespondValidation,
  signupRequestValidation,
  signupRespondValidation,
  updateTeacherDetailsRequestValidation,
  updateTeacherDetailsResponseValidation,
  addTopicRequestValidation,
  addTopicResponseValidation,
  updateTopicRequestValidation,
  updateTopicResponseValidation,
  deleteTopicRequestValidation,
  deleteTopicResponseValidation,
  addPaymentMethodRequestValidation,
  addPaymentMethodResponseValidation,
  updatePaymentMethodRequestValidation,
  updatePaymentMethodResponseValidation,
  deletePaymentMethodRequestValidation,
  deletePaymentMethodResponseValidation,
  addWithdrawMethodRequestValidation,
  addWithdrawMethodResponseValidation,
  updateWithdrawMethodRequestValidation,
  updateWithdrawMethodResponseValidation,
  deleteWithdrawMethodRequestValidation,
  deleteWithdrawMethodResponseValidation,
  getPaymentMethodsRequestValidation,
  getPaymentMethodsResponseValidation,
  getWithdrawMethodsRequestValidation,
  getWithdrawMethodsResponseValidation,
} from './validation';
import path from 'path';
import {
  searchRequestValidation,
  searchResponseValidation,
  searchWithFiltersRequestValidation,
  searchWithFiltersResponseValidation,
} from './validation/search';
import { get } from 'http';

const servicesNames = {
  signup: 'signup',
  meet: 'meet',
  call: 'call',
  auth: 'auth',
  search: 'search',
  teach: 'teach',
  paymnent: 'payment',
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
  ... path maps from other services
  BECOME_TEACHER: {
    path: '/become-teacher',
    method: 'post',
    service: servicesNames.teach,
    requestValidation: becomeTeacherRequestValidation,
    responseValidation: becomeTeacherResponseValidation,
  },
  UPDATE_TEACHER_DETAILS: {
    path: '/update-teacher-details',
    method: 'put',
    service: servicesNames.teach,
    requestValidation: updateTeacherDetailsRequestValidation,
    responseValidation: updateTeacherDetailsResponseValidation,
  },
  STOP_TEACH: {
    path: '/stop-teacher',
    method: 'delete',
    service: servicesNames.teach,
    requestValidation: stopTeachRequestValidation,
    responseValidation: stopTeachRequestValidation,
  },
  ADD_TOPIC: {
    path: '/add-topic',
    method: 'post',
    service: servicesNames.teach,
    requestValidation: addTopicRequestValidation,
    responseValidation: addTopicResponseValidation,
  },
  UPDATE_TOPIC: {
    path: '/update-topic',
    method: 'put',
    service: servicesNames.teach,
    requestValidation: updateTopicRequestValidation,
    responseValidation: updateTopicResponseValidation,
  },
  DELETE_TOPIC: {
    path: '/delete-topic',
    method: 'delete',
    service: servicesNames.teach,
    requestValidation: deleteTopicRequestValidation,
    responseValidation: deleteTopicResponseValidation,
  },
  ... path maps from other services
} as const;

Based on all the provided information and code examples, please generate similar files for the next service i will ask you to. Ensure that these files follow the same standards and structure as the 'Teach' service files.


# Consultation Platform: Detailed Service Responsibilities and Flows

## 1. Signup & User Profile Service

### Responsibilities:
- **User Registration:**
  - Handle user registration with email/password or OAuth.
  - Validate user email via pincode (for email/password registration).
- **Authentication Methods:**
  - Allow users to add multiple sign-in methods.
- **Profile Management:**
  - Manage personal details (first name, last name, email, password, settings).

### Flows:

- **'Email Signup':**
  - **Flow:**
    1. **User** provides their email address.
    2. **Signup & User Profile Service** generates a pincode.
    3. **Signup & User Profile Service** publishes a `SEND_NOTIFICATION` event.
    4. **Send Service** listens to `SEND_NOTIFICATION` and sends an email with the pincode.
    5. **User** receives the email and provides the pincode, first and last name, and password.
    6. **Signup & User Profile Service** validates the pincode and creates a new user.
    7. **Signup & User Profile Service** publishes `USER_CREATED` and `NEW_PASSWORD_SET` events.
    8. **Auth Service** listens to `USER_CREATED` and updates its records.
  - **Events Published:** `SEND_NOTIFICATION`, `USER_CREATED`, `NEW_PASSWORD_SET`
  - **Events Listened To:** None

- **'OAuth Signup':**
  - **Flow:**
    1. **User** selects an OAuth provider (Google, Facebook, etc.).
    2. **User** authenticates with the chosen provider.
    3. **Signup & User Profile Service** receives OAuth token and user information.
    4. **Signup & User Profile Service** creates a new user account with OAuth information.
    5. **Signup & User Profile Service** publishes `USER_CREATED` and `OAUTH_LINKED` events.
    6. **Auth Service** listens to `USER_CREATED` and updates its records.
  - **Events Published:** `USER_CREATED`, `OAUTH_LINKED`
  - **Events Listened To:** None

- **'Add Authentication Method':**
  - **Flow:**
    1. **Existing User** chooses to add a new sign-in method.
    2. **User** selects either email/password or OAuth.
    3. **If email/password:**
       - **Signup & User Profile Service** generates a pincode.
       - **Signup & User Profile Service** publishes a `SEND_NOTIFICATION` event.
       - **Send Service** sends the verification email with pincode.
       - **User** enters pincode and new password.
       - **Signup & User Profile Service** validates the pincode.
    4. **If OAuth:**
       - **User** authenticates with the chosen OAuth provider.
    5. **Signup & User Profile Service** adds new authentication method to the user's account.
    6. **Signup & User Profile Service** publishes `AUTH_METHOD_ADDED` event.
  - **Events Published:** `SEND_NOTIFICATION` (if email/password), `AUTH_METHOD_ADDED`
  - **Events Listened To:** None

---

## 2. Auth Service

### Responsibilities:
- **User Authentication:**
  - Authenticate users via credentials or OAuth.
  - Generate JWTs containing the user's ID.
- **Update Records:**
  - Listen for user creation and authentication method updates.

### Flows:

- **'Successful Authentication':**
  - **Flow:**
    1. **User** provides credentials or OAuth token.
    2. **Auth Service** validates the provided information.
    3. **Auth Service** generates a new JWT with the user's ID.
    4. **Auth Service** returns the JWT to the client.
  - **Events Published:** `AUTH_SUCCESS`
  - **Events Listened To:** `USER_CREATED`, `NEW_PASSWORD_SET`, `OAUTH_LINKED`, `AUTH_METHOD_ADDED`

- **'Failed Authentication':**
  - **Flow:**
    1. **User** provides invalid credentials or OAuth token.
    2. **Auth Service** fails to validate the provided information.
    3. **Auth Service** logs the failed attempt.
    4. **Auth Service** returns an error message to the client.
  - **Events Published:** `AUTH_FAILURE`
  - **Events Listened To:** None

---

## 3. Consultant Service

### Responsibilities:
- **Onboarding:**
  - Implement consultant onboarding processes.
- **Profile Management:**
  - Manage consultant profiles.
  - Handle topic additions, updates, and removals.
- **Data Publishing:**
  - Publish consultant and topic data to other services as needed.

### Flows:

- **'Onboard New Consultant':**
  - **Flow:**
    1. **Logged-in User** clicks 'Become a Consultant' button.
    2. **User** fills out the consultant registration form (profile picture, languages, country, etc.).
    3. **Consultant Service** creates a new consultant profile.
    4. **Consultant Service** publishes `CONSULTANT_ONBOARDED` event.
    5. **Notifications Service** listens to `CONSULTANT_ONBOARDED` and may send onboarding confirmations.
  - **Events Published:** `CONSULTANT_ONBOARDED`
  - **Events Listened To:** `USER_CREATED`

- **'Update Consultant Profile':**
  - **Flow:**
    1. **Consultant** clicks 'Edit Profile' button.
    2. **Consultant** updates profile information.
    3. **Consultant Service** saves the updated profile.
    4. **Consultant Service** publishes `CONSULTANT_PROFILE_UPDATED` event.
  - **Events Published:** `CONSULTANT_PROFILE_UPDATED`
  - **Events Listened To:** None

- **'Add Consultation Topic':**
  - **Flow:**
    1. **Consultant** clicks 'Add New Topic'.
    2. **Consultant** fills in topic details.
    3. **Consultant Service** creates a new topic.
    4. **Consultant Service** publishes `TOPIC_ADDED` event.
  - **Events Published:** `TOPIC_ADDED`
  - **Events Listened To:** None

- **'Update Topic':**
  - **Flow:**
    1. **Consultant** clicks 'Edit Topic'.
    2. **Consultant** updates topic information.
    3. **Consultant Service** saves the updated topic.
    4. **Consultant Service** publishes `TOPIC_UPDATED` event.
  - **Events Published:** `TOPIC_UPDATED`
  - **Events Listened To:** None

- **'Remove Topic':**
  - **Flow:**
    1. **Consultant** clicks 'Remove Topic'.
    2. **Consultant** confirms the removal.
    3. **Consultant Service** deletes the topic.
    4. **Consultant Service** publishes `TOPIC_REMOVED` event.
  - **Events Published:** `TOPIC_REMOVED`
  - **Events Listened To:** None

---

## 4. Availabilities Service

### Responsibilities:
- **Manage Consultant Availability Blocks:**
  - Allow consultants to set default weekly schedules.
  - Enable consultants to modify their default schedule for specific weeks.
  - Allow consultants to set an 'available now' status.
- **Update Availability Data:**
  - Manage the limit of students that can book a call in each availability block.
  - Implement call queues for each availability block.
  - Implement waiting lists for popular time slots.
  - Track 'maximum calls per block' and update block status accordingly.
  - Listen for booking events (created or cancelled) to update availability blocks accordingly.
  - Listen for call events (started or ended) to update the 'available now' status.

### Flows:

- **'Set Default Schedule':**
  - **Flow:**
    1. **Consultant** accesses availability settings.
    2. **Consultant** sets their default weekly availability schedule.
    3. **Availabilities Service** saves the default schedule and generates availability blocks for future dates.
    4. **Availabilities Service** publishes `DEFAULT_SCHEDULE_SET` event.
  - **Events Published:** `DEFAULT_SCHEDULE_SET`
  - **Events Listened To:** None

- **'Override Weekly Schedule':**
  - **Flow:**
    1. **Consultant** selects a specific week to modify.
    2. **Consultant** updates their availability for that week.
    3. **Availabilities Service** saves the modified schedule and updates availability blocks accordingly.
    4. **Availabilities Service** publishes `WEEKLY_SCHEDULE_UPDATED` event.
  - **Events Published:** `WEEKLY_SCHEDULE_UPDATED`
  - **Events Listened To:** None

- **'Toggle Available Now':**
  - **Flow:**
    1. **Consultant** toggles their 'available now' status.
    2. **Availabilities Service** updates the immediate availability status.
    3. **Availabilities Service** publishes `AVAILABLE_NOW_STATUS_CHANGED` event.
  - **Events Published:** `AVAILABLE_NOW_STATUS_CHANGED`
  - **Events Listened To:** None

- **'Booking Created':**
  - **Flow:**
    1. **Availabilities Service** receives a `BOOKING_CREATED` event from the **Booking Service**.
    2. **Availabilities Service** identifies the associated availability block.
    3. **Availabilities Service** increments the number of bookings for that block.
    4. **If** the block reaches its booking limit:
       - **Availabilities Service** updates the block status to 'full'.
       - **Availabilities Service** publishes `AVAILABILITY_BLOCK_FULL` event.
    5. **Availabilities Service** publishes `AVAILABILITY_UPDATED` event.
  - **Events Published:** `AVAILABILITY_UPDATED`, `AVAILABILITY_BLOCK_FULL` (if applicable)
  - **Events Listened To:** `BOOKING_CREATED`

- **'Booking Cancelled':**
  - **Flow:**
    1. **Availabilities Service** receives a `BOOKING_CANCELLED` event from the **Booking Service**.
    2. **Availabilities Service** identifies the associated availability block.
    3. **Availabilities Service** decrements the number of bookings for that block.
    4. **If** the block was previously full and now has available slots:
       - **Availabilities Service** updates the block status to 'available'.
       - **Availabilities Service** publishes `AVAILABILITY_BLOCK_AVAILABLE` event.
    5. **Availabilities Service** publishes `AVAILABILITY_UPDATED` event.
  - **Events Published:** `AVAILABILITY_UPDATED`, `AVAILABILITY_BLOCK_AVAILABLE` (if applicable)
  - **Events Listened To:** `BOOKING_CANCELLED`

- **'Consultant Enters Call':**
  - **Flow:**
    1. **Availabilities Service** receives a `CALL_STARTED` event from the **Call Service**.
    2. **If** the consultant's 'available now' status is true:
       - **Availabilities Service** updates 'available now' to false.
       - **Availabilities Service** publishes `AVAILABLE_NOW_STATUS_CHANGED` event.
  - **Events Published:** `AVAILABLE_NOW_STATUS_CHANGED` (if status changed)
  - **Events Listened To:** `CALL_STARTED`

- **'Consultant Exits Call':**
  - **Flow:**
    1. **Availabilities Service** receives a `CALL_ENDED` event from the **Call Service**.
    2. **Availabilities Service** checks if the consultant wishes to reset 'available now' status.
    3. **If applicable**, **Availabilities Service** updates 'available now' to true.
    4. **Availabilities Service** publishes `AVAILABLE_NOW_STATUS_CHANGED` event.
  - **Events Published:** `AVAILABLE_NOW_STATUS_CHANGED` (if status changed)
  - **Events Listened To:** `CALL_ENDED`

- **'Manage Call Queue':**
  - **Flow:**
    1. **Availabilities Service** tracks bookings for each availability block.
    2. **Availabilities Service** maintains a call queue for each block.
    3. **Availabilities Service** ensures the queue doesn't exceed the maximum calls per block.
    4. **If** the limit is reached:
       - **Availabilities Service** updates the block status to 'full'.
       - **Availabilities Service** publishes `AVAILABILITY_BLOCK_FULL` event.
    5. **If** cancellations occur:
       - **Availabilities Service** updates the block status to 'available'.
       - **Availabilities Service** publishes `AVAILABILITY_BLOCK_AVAILABLE` event.
  - **Events Published:** `AVAILABILITY_BLOCK_FULL` (if limit reached), `AVAILABILITY_BLOCK_AVAILABLE` (if slots open up)
  - **Events Listened To:** `BOOKING_CREATED`, `BOOKING_CANCELLED`

- **'Check Consultant Availability':**
  - **Flow:**
    1. **User or Service** requests the consultant's availability for a specific time.
    2. **Availabilities Service** checks the consultant's availability blocks at the requested time.
    3. **Availabilities Service** returns the availability status (available or full).
  - **Events Published:** None (this is a query operation)
  - **Events Listened To:** None

---

## 5. Search & Recommendation Service

### Responsibilities:
- **Indexing:**
  - Index all consultants and topics.
  - Update the search index with new or modified data.
- **Search Optimization:**
  - Process and optimize user search queries.
  - Implement filtering by topic, rating, hourly rate, availability, and 'available now' status.
- **Personalization:**
  - Generate personalized consultant recommendations.
  - Implement autocomplete and search suggestions.
  - Handle spell correction in search queries.

### Flows:

- **'Index Data':**
  - **Flow:**
    1. **Search & Recommendation Service** listens to relevant events (e.g., `CONSULTANT_ONBOARDED`, `TOPIC_ADDED`, `AVAILABILITY_UPDATED`).
    2. **Search & Recommendation Service** processes and indexes the new or updated data.
    3. **Search & Recommendation Service** updates the search index.
  - **Events Published:** `DATA_INDEXED`
  - **Events Listened To:** `CONSULTANT_ONBOARDED`, `CONSULTANT_PROFILE_UPDATED`, `TOPIC_ADDED`, `TOPIC_UPDATED`, `TOPIC_REMOVED`, `AVAILABILITY_UPDATED`, `AVAILABILITY_BLOCK_FULL`, `AVAILABILITY_BLOCK_AVAILABLE`, `AVAILABLE_NOW_STATUS_CHANGED`, `RATING_UPDATED`

- **'Process Search Query':**
  - **Flow:**
    1. **User** enters a search query.
    2. **Search & Recommendation Service** processes the query, corrects spelling if necessary.
    3. **Search & Recommendation Service** applies selected filters.
    4. **Search & Recommendation Service** retrieves relevant consultants and topics from the index.
    5. **Search & Recommendation Service** returns search results to the user.
  - **Events Published:** None
  - **Events Listened To:** None

- **'Generate Recommendations':**
  - **Flow:**
    1. **Search & Recommendation Service** analyzes user behavior and preferences.
    2. **Search & Recommendation Service** generates personalized consultant recommendations.
    3. **Recommendations** are presented to the user.
  - **Events Published:** `RECOMMENDATIONS_GENERATED`
  - **Events Listened To:** `USER_BEHAVIOR_UPDATED`, `RATING_UPDATED`

---

## 6. Booking Service

### Responsibilities:
- **Handle Booking Requests:**
  - Process booking requests from students via chat or calendar.
  - Process booking approvals or rejections from consultants.
  - Handle rescheduling and cancellation requests.
- **Coordinate Communications:**
  - Coordinate with **Notifications Service** for client notifications.
  - Coordinate with **Availabilities Service** for up-to-date scheduling.
  - Coordinate with **Chat Service** to update booking status.

### Flows:

- **'Create Booking Request':**
  - **Flow:**
    1. **Student** initiates a booking request via chat or calendar.
    2. **Booking Service** queries **Availabilities Service** for consultant's availability.
    3. **Booking Service** creates a provisional booking.
    4. **Booking Service** publishes `BOOKING_REQUESTED` event.
    5. **Notifications Service** listens to `BOOKING_REQUESTED` and notifies the consultant.
  - **Events Published:** `BOOKING_REQUESTED`
  - **Events Listened To:** None

- **'Process Booking Response':**
  - **Flow:**
    1. **Consultant** reviews the booking request.
    2. **Consultant** approves or rejects the request via **Booking Service**.
    3. **Booking Service** updates the booking status.
    4. **If approved:**
       - **Booking Service** publishes `BOOKING_APPROVED` and `BOOKING_CREATED` events.
       - **Availabilities Service** listens to `BOOKING_CREATED` and updates availability.
       - **Notifications Service** listens to `BOOKING_APPROVED` and notifies the student.
    5. **If rejected:**
       - **Booking Service** publishes `BOOKING_REJECTED` event.
       - **Notifications Service** listens to `BOOKING_REJECTED` and notifies the student.
  - **Events Published:** `BOOKING_APPROVED` (if approved), `BOOKING_CREATED` (if approved), `BOOKING_REJECTED` (if rejected)
  - **Events Listened To:** None

- **'Reschedule Booking':**
  - **Flow:**
    1. **Student or Consultant** requests to reschedule via **Booking Service**.
    2. **Booking Service** queries **Availabilities Service** for new availability.
    3. **Booking Service** updates the booking with the new time.
    4. **Booking Service** publishes `BOOKING_RESCHEDULED` event.
    5. **Notifications Service** listens to `BOOKING_RESCHEDULED` and notifies both parties.
  - **Events Published:** `BOOKING_RESCHEDULED`
  - **Events Listened To:** None

- **'Cancel Booking':**
  - **Flow:**
    1. **Student or Consultant** initiates a cancellation via **Booking Service**.
    2. **Booking Service** processes the cancellation.
    3. **Booking Service** publishes `BOOKING_CANCELLED` event.
    4. **Availabilities Service** listens to `BOOKING_CANCELLED` and updates availability.
    5. **Notifications Service** listens to `BOOKING_CANCELLED` and notifies the other party.
  - **Events Published:** `BOOKING_CANCELLED`
  - **Events Listened To:** None

---

## 7. Chat Service

### Responsibilities:
- **Real-Time Communication:**
  - Manage text messaging between users.
  - Implement group chats.
  - Handle 'message read' receipts.
- **Media Sharing:**
  - Allow sharing of images, voice recordings, files, and videos via S3.
- **Chat History Management:**
  - Store chat history.
  - Implement chat archiving and retrieval.
- **Booking Integration:**
  - Handle booking requests within chat.
  - Publish events for the **Booking Service**.
  - Listen for booking status updates and display them in chat.

### Flows:

- **'Send Message':**
  - **Flow:**
    1. **User** composes and sends a text message.
    2. **Chat Service** processes the message.
    3. **Chat Service** publishes `MESSAGE_SENT` event.
    4. **Sockets Service** listens to `MESSAGE_SENT` and delivers the message in real-time.
  - **Events Published:** `MESSAGE_SENT`
  - **Events Listened To:** None

- **'Share Media':**
  - **Flow:**
    1. **User** selects media to share in chat.
    2. **Chat Service** uploads media to S3 storage.
    3. **Chat Service** generates a secure link to the media.
    4. **Chat Service** sends the media link within the chat message.
    5. **Chat Service** publishes `MEDIA_SHARED` event.
  - **Events Published:** `MEDIA_SHARED`
  - **Events Listened To:** None

- **'Process Booking Request':**
  - **Flow:**
    1. **Student** initiates a booking request within the chat.
    2. **Chat Service** captures booking details.
    3. **Chat Service** publishes `CHAT_BOOKING_REQUESTED` event.
    4. **Booking Service** listens to `CHAT_BOOKING_REQUESTED` and processes the booking.
    5. **Chat Service** updates chat with booking status.
  - **Events Published:** `CHAT_BOOKING_REQUESTED`
  - **Events Listened To:** `BOOKING_APPROVED`, `BOOKING_REJECTED`, `BOOKING_CANCELLED`, `BOOKING_RESCHEDULED`

---

## 8. Notifications Service

### Responsibilities:
- **User Preferences:**
  - Manage notification preferences for each user.
- **Notification Management:**
  - Generate notifications based on events.
  - Implement notification scheduling and templates.
  - Handle delivery status tracking.
- **Event Publishing:**
  - Publish events to the **Send Service** to deliver notifications.

### Flows:

- **'Set Notification Preferences':**
  - **Flow:**
    1. **User** accesses notification settings.
    2. **User** updates their preferences (channels, notification types).
    3. **Notifications Service** saves the updated settings.
    4. **Notifications Service** publishes `NOTIFICATION_PREFERENCES_UPDATED` event.
  - **Events Published:** `NOTIFICATION_PREFERENCES_UPDATED`
  - **Events Listened To:** None

- **'Send Notification Based on Events':**
  - **Flow:**
    1. **Notifications Service** listens to various events requiring user notification (e.g., `BOOKING_APPROVED`, `PAYMENT_PROCESSED`).
    2. **Notifications Service** checks user's notification preferences.
    3. **Notifications Service** generates the notification content using templates.
    4. **Notifications Service** publishes a `SEND_NOTIFICATION` event with all content ready to be sent.
    5. **Send Service** listens to `SEND_NOTIFICATION` and sends the notification via the specified channels.
  - **Events Published:** `SEND_NOTIFICATION`
  - **Events Listened To:** Various events from other services (e.g., `BOOKING_APPROVED`, `PAYMENT_PROCESSED`)

- **'Track Delivery Status':**
  - **Flow:**
    1. **Send Service** publishes delivery status events (`DELIVERY_SUCCEEDED`, `DELIVERY_FAILED`).
    2. **Notifications Service** listens to these events and updates notification status.
    3. **If** delivery failed, **Notifications Service** may implement retry mechanisms.
  - **Events Published:** None
  - **Events Listened To:** `DELIVERY_SUCCEEDED`, `DELIVERY_FAILED`

---

## 9. Call Service

### Responsibilities:
- **Call Management:**
  - Manage call sessions using a third-party video call provider.
  - Implement virtual waiting rooms.
  - Handle call interruptions and reconnections.
- **Tracking & Monitoring:**
  - Track call duration for billing and availability updates.
  - Monitor call quality and generate reports.

### Flows:

- **'Initiate Call':**
  - **Flow:**
    1. **User** initiates a call session.
    2. **Call Service** sets up the call with the third-party provider.
    3. **Call Service** provides call session details to participants.
    4. **Call Service** publishes `CALL_INITIATED` event.
    5. **Notifications Service** listens to `CALL_INITIATED` and notifies participants.
  - **Events Published:** `CALL_INITIATED`
  - **Events Listened To:** `BOOKING_APPROVED`

- **'Start Consultation':**
  - **Flow:**
    1. **Participants** are ready to begin.
    2. **Call Service** transitions from waiting room to active call.
    3. **Call Service** starts call duration tracking.
    4. **Call Service** publishes `CALL_STARTED` event.
    5. **Availabilities Service** listens to `CALL_STARTED` and updates 'available now' status.
  - **Events Published:** `CALL_STARTED`
  - **Events Listened To:** `CALL_INITIATED`

- **'End Call':**
  - **Flow:**
    1. **Participants** conclude the call.
    2. **Call Service** ends the call session with the provider.
    3. **Call Service** records call duration.
    4. **Call Service** publishes `CALL_ENDED` and `CALL_DURATION_RECORDED` events.
    5. **Payments Service** listens to `CALL_ENDED` for billing.
    6. **Availabilities Service** listens to `CALL_ENDED` and updates 'available now' status.
    7. **Rating & Reviewing Service** listens to `CALL_ENDED` and may schedule review reminders.
  - **Events Published:** `CALL_ENDED`, `CALL_DURATION_RECORDED`
  - **Events Listened To:** `CALL_STARTED`

---

## 10. Payments Service

### Responsibilities:
- **Payment Method Management:**
  - Securely manage users' payment methods.
  - Securely manage consultants' payout methods.
- **Transaction Processing:**
  - Process payments from students securely via third-party providers.
  - Calculate and process monthly bulk payouts to consultants.
  - Manage application fees.
- **Receipts and Notifications:**
  - Generate and distribute receipts.
  - Upload receipts to S3 and generate signed URLs.
  - Send notifications for payment events.

### Flows:

- **'Add Payment Method':**
  - **Flow:**
    1. **User** selects to add a new payment method.
    2. **User** enters payment details (credit card, PayPal, etc.).
    3. **Payments Service** encrypts and securely stores the payment information.
    4. **Payments Service** confirms successful addition.
    5. **Payments Service** publishes `PAYMENT_METHOD_ADDED` event.
  - **Events Published:** `PAYMENT_METHOD_ADDED`
  - **Events Listened To:** None

- **'Update Payment Method':**
  - **Flow:**
    1. **User** selects to update an existing payment method.
    2. **User** enters new payment details.
    3. **Payments Service** updates the payment information.
    4. **Payments Service** confirms successful update.
    5. **Payments Service** publishes `PAYMENT_METHOD_UPDATED` event.
  - **Events Published:** `PAYMENT_METHOD_UPDATED`
  - **Events Listened To:** None

- **'Remove Payment Method':**
    - **Flow:**
        1. **User** selects to remove a payment method.
        2. **Payments Service** deletes the payment information.
        3. **Payments Service** confirms successful removal.
        4. **Payments Service** publishes `PAYMENT_METHOD_REMOVED` event.
    - **Events Published:** `PAYMENT_METHOD_REMOVED`
    - **Events Listened To:** None

- **'Add Payout Method':**
  - **Flow:**
    1. **Consultant** selects to add a new payout method.
    2. **Consultant** enters payout details (bank account, PayPal, etc.).
    3. **Payments Service** encrypts and securely stores the payout information.
    4. **Payments Service** confirms successful addition.
    5. **Payments Service** publishes `PAYOUT_METHOD_ADDED` event.
  - **Events Published:** `PAYOUT_METHOD_ADDED`
  - **Events Listened To:** None

- **'Update Payout Method':**
    - **Flow:**
        1. **Consultant** selects to update an existing payout method.
        2. **Consultant** enters new payout details.
        3. **Payments Service** updates the payout information.
        4. **Payments Service** confirms successful update.
        5. **Payments Service** publishes `PAYOUT_METHOD_UPDATED` event.
    - **Events Published:** `PAYOUT_METHOD_UPDATED`
    - **Events Listened To:** None  

- **'Remove Payout Method':**
    - **Flow:**
        1. **Consultant** selects to remove a payout method.
        2. **Payments Service** deletes the payout information.
        3. **Payments Service** confirms successful removal.
        4. **Payments Service** publishes `PAYOUT_METHOD_REMOVED` event.
    - **Events Published:** `PAYOUT_METHOD_REMOVED`
    - **Events Listened To:** None

- **'Process Payment':**
  - **Flow:**
    1. **Payments Service** listens to `CALL_ENDED` event.
    2. **Payments Service** calculates the amount due.
    3. **Payments Service** charges the student's payment method.
    4. **If** payment is successful:
       - **Payments Service** generates a receipt.
       - **Payments Service** uploads receipt to S3 and generates a signed URL.
       - **Payments Service** publishes `PAYMENT_PROCESSED` event.
       - **Notifications Service** listens to `PAYMENT_PROCESSED` and notifies the student.
    5. **If** payment fails:
       - **Payments Service** publishes `PAYMENT_FAILED` event.
       - **Notifications Service** listens to `PAYMENT_FAILED` and notifies the student.
    6. **Payments Service** accounts for application fees during the transaction.
  - **Events Published:** `PAYMENT_PROCESSED`, `RECEIPT_GENERATED`, `PAYMENT_FAILED`
  - **Events Listened To:** `CALL_ENDED`

- **'Monthly Payout':**
  - **Flow:**
    1. **Payments Service** calculates monthly earnings for each consultant.
    2. **Payments Service** initiates bulk payout process.
    3. For each successful payout:
       - **Payments Service** generates a payout receipt.
       - **Payments Service** uploads receipt to S3 and generates a signed URL.
       - **Payments Service** publishes `PAYOUT_PROCESSED` event.
       - **Notifications Service** listens to `PAYOUT_PROCESSED` and notifies the consultant.
    4. For each failed payout:
       - **Payments Service** logs the failure.
       - **Payments Service** publishes `PAYOUT_FAILED` event.
       - **Notifications Service** listens to `PAYOUT_FAILED` and notifies the consultant.
  - **Events Published:** `PAYOUT_PROCESSED`, `PAYOUT_RECEIPT_GENERATED`, `PAYOUT_FAILED`
  - **Events Listened To:** None

---

## 11. Rating & Reviewing Service

### Responsibilities:
- **Review Management:**
  - Collect and store user reviews.
- **Rating Calculation:**
  - Calculate and update consultant ratings.
- **Review Reminders:**
  - Implement a system to remind users to leave reviews.
- **Serve reviews and ratings to clients:**
  - serve reviews and ratings to clients: 
    - on the consultant's profile page.
    - on 'my topics' page.
    - on each topic's page.


### Flows:

- **'Submit Immediate Review':**
  - **Flow:**
    1. **Client-side Application** redirects student to review page after call ends.
    2. **Student** submits rating and feedback.
    3. **Rating & Reviewing Service** stores the review and updates consultant's rating.
    4. **Rating & Reviewing Service** publishes `REVIEW_SUBMITTED` and `RATING_UPDATED` events.
    5. **Search & Recommendation Service** listens to `RATING_UPDATED` and updates search rankings.
    6. **Consultant's Profile** displays updated ratings to clients.
  - **Events Published:** `REVIEW_SUBMITTED`, `RATING_UPDATED`
  - **Events Listened To:** `CALL_ENDED`

- **'Request Long-term Review':**
  - **Flow:**
    1. **Rating & Reviewing Service** schedules a long-term review reminder a few weeks after the call.
    2. **If** no review has been submitted, **Notifications Service** sends a reminder to the student.
    3. **Student** may submit a long-term review.
    4. **Rating & Reviewing Service** stores the long-term review and updates ratings.
    5. **Rating & Reviewing Service** publishes `LONG_TERM_REVIEW_SUBMITTED` and `RATING_UPDATED` events.
    6. **Search & Recommendation Service** updates search rankings accordingly.
  - **Events Published:** `LONG_TERM_REVIEW_SUBMITTED`, `RATING_UPDATED`
  - **Events Listened To:** None

- **'Display Reviews and Ratings':**
    - **Flow:**
        1. **Client-side Application** requests consultant's reviews and ratings.
        2. **Rating & Reviewing Service** retrieves the data.
        3. **Rating & Reviewing Service** returns the reviews and ratings to the client.
        4. **Client-side Application** displays the reviews and ratings on the consultant's profile.
    - **Events Published:** None (this is a query operation)
    - **Events Listened To:** None

---

## 12. Send Service

### Responsibilities:
- **Communication Handling:**
  - Listen for `SEND_NOTIFICATION` events from **Notifications Service**.
  - Send communications via Email, SMS, WhatsApp, and Push Notifications.
- **Delivery Management:**
  - Handle delivery status and failures.
  - Implement retry mechanisms.

### Flows:

- **'Send Notification':**
  - **Flow:**
    1. **Send Service** listens to `SEND_NOTIFICATION` event.
    2. **Send Service** receives the complete message content ready to be sent.
    3. **Send Service** sends the message via appropriate channel.
    4. **Send Service** tracks delivery status.
    5. **Send Service** publishes `DELIVERY_SUCCEEDED` or `DELIVERY_FAILED` event.
  - **Events Published:** `DELIVERY_SUCCEEDED`, `DELIVERY_FAILED`
  - **Events Listened To:** `SEND_NOTIFICATION`,(directly from other services for pincode emails)

- **'Handle Send Failure and Retry':**
  - **Flow:**
    1. **Send Service** detects a send failure.
    2. **Send Service** logs the failure.
    3. **Send Service** determines if a retry is appropriate.
    4. **If** retry is appropriate:
       - **Send Service** schedules a retry.
       - **Send Service** attempts to resend the notification.
       - **Send Service** updates delivery status accordingly.
    5. **Send Service** publishes `RETRY_SCHEDULED` and updates.
  - **Events Published:** `RETRY_SCHEDULED`, `DELIVERY_SUCCEEDED`, `DELIVERY_FAILED`
  - **Events Listened To:** Internal failure detection

---

## 13. Sockets Service

### Responsibilities:
- **Real-Time Communication:**
  - Listen to `SOCKET_MESSAGE` events and push them to clients.
  - Manage WebSocket connections and reconnection strategies.
- **Presence Detection:**
  - Implement online/offline status detection.
  - Publish `USER_ONLINE` and `USER_OFFLINE` events.

### Flows:

- **'Push Message':**
  - **Flow:**
    1. **Sockets Service** listens to `SOCKET_MESSAGE`, `MESSAGE_SENT`, `NOTIFICATION_DISPATCHED` events.
    2. **Sockets Service** identifies target client(s).
    3. **Sockets Service** delivers the message in real-time via WebSocket.
    4. **Sockets Service** publishes `MESSAGE_DELIVERED` event.
  - **Events Published:** `MESSAGE_DELIVERED`
  - **Events Listened To:** `SOCKET_MESSAGE`, `MESSAGE_SENT`, `NOTIFICATION_DISPATCHED`

- **'Update Presence Status':**
  - **Flow:**
    1. **Sockets Service** detects when a client connects.
    2. **Sockets Service** updates user's status to 'online'.
    3. **Sockets Service** publishes `USER_ONLINE` event.
    4. **Sockets Service** detects when a client disconnects.
    5. **Sockets Service** updates user's status to 'offline'.
    6. **Sockets Service** publishes `USER_OFFLINE` event.
  - **Events Published:** `USER_ONLINE`, `USER_OFFLINE`
  - **Events Listened To:** None

---

**Note:** Each service in this platform operates on its own server. All services utilize a utility function from the **'tomeroko3-common'** package to validate JWTs for authenticated requests. This ensures consistent and secure authentication across the entire platform.
