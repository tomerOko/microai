This prompt contains the main files of a service (the 'Teach' service, created only as an example for the rest of the services) written correctly according to the project standards
along with MongoDB and RabbitMQ initializations, and 7 validation and types files from the shared validation package ('events-tomeroko3') each service will have his own 7 files inside the shared validation package. 
Your task is to generate similar files for each service i will ask you to, following the same standards, structure and validations, and aligning with the previously generated 'Teach' service code.

First, here are the main files of a service written correctly according to the project standards:

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
      errorHandler(error, next);
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
      errorHandler(error, next);
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
      errorHandler(error, next);
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
      errorHandler(error, next);
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
      errorHandler(error, next);
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
      errorHandler(error, next);
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
      errorHandler(error, next);
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
  SEND_PINCODE: {
    path: '/send-pincode',
    method: 'post',
    requestValidation: sendPincodeRequestValidation,
    responseValidation: sendPincodeRespondValidation,
    service: servicesNames.signup,
  },
  SIGNUP: {
    path: '/signup',
    method: 'post',
    requestValidation: signupRequestValidation,
    responseValidation: signupRespondValidation,
    service: servicesNames.signup,
  },
  LOGIN: {
    path: '/login',
    method: 'post',
    service: servicesNames.auth,
    requestValidation: loginRequestValidation,
    responseValidation: loginRespondValidation,
  },
  SEARCH: {
    path: '/search',
    method: 'post',
    service: servicesNames.search,
    requestValidation: searchRequestValidation,
    responseValidation: searchResponseValidation,
  },
  SEARCH_WITH_FILTERS: {
    path: '/search-with-filters',
    method: 'post',
    service: servicesNames.search,
    requestValidation: searchWithFiltersRequestValidation,
    responseValidation: searchWithFiltersResponseValidation,
  },
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
  ADD_PAYMENT_METHOD: {
    path: '/add-payment-method',
    method: 'post',
    service: servicesNames.paymnent,
    requestValidation: addPaymentMethodRequestValidation,
    responseValidation: addPaymentMethodResponseValidation,
  },
  UPDATE_PAYMENT_METHOD: {
    path: '/update-payment-method',
    method: 'put',
    service: servicesNames.paymnent,
    requestValidation: updatePaymentMethodRequestValidation,
    responseValidation: updatePaymentMethodResponseValidation,
  },
  DELETE_PAYMENT_METHOD: {
    path: '/delete-payment-method',
    method: 'delete',
    service: servicesNames.paymnent,
    requestValidation: deletePaymentMethodRequestValidation,
    responseValidation: deletePaymentMethodResponseValidation,
  },
  GET_USER_PAYMENT_METHODS: {
    path: '/get-payment-methods',
    method: 'get',
    service: servicesNames.paymnent,
    requestValidation: getPaymentMethodsRequestValidation,
    responseValidation: getPaymentMethodsResponseValidation,
  },
  ADD_WITHDRAW_METHOD: {
    path: '/add-bank-account',
    method: 'post',
    service: servicesNames.paymnent,
    requestValidation: addWithdrawMethodRequestValidation,
    responseValidation: addWithdrawMethodResponseValidation,
  },
  UPDATE_WITHDRAW_METHOD: {
    path: '/update-bank-account',
    method: 'put',
    service: servicesNames.paymnent,
    requestValidation: updateWithdrawMethodRequestValidation,
    responseValidation: updateWithdrawMethodResponseValidation,
  },
  DELETE_WITHDRAW_METHOD: {
    path: '/delete-bank-account',
    method: 'delete',
    service: servicesNames.paymnent,
    requestValidation: deleteWithdrawMethodRequestValidation,
    responseValidation: deleteWithdrawMethodResponseValidation,
  },
  GET_USER_WITHDRAW_METHODS: {
    path: '/get-withdraw-methods',
    method: 'get',
    service: servicesNames.paymnent,
    requestValidation: getWithdrawMethodsRequestValidation,
    responseValidation: getWithdrawMethodsResponseValidation,
  },
} as const;

Based on all the provided information and code examples, please generate similar files for the next service i will ask you to. Ensure that these files follow the same standards and structure as the 'Teach' service files.