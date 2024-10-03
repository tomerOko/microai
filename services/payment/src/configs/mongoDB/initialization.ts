// configs/mongoDB/initialization.ts
import {
  CollectionInitializerProps,
  SafeCollection,
  collectionInitializer,
  functionWrapper,
} from 'common-lib-tomeroko3';
import { paymentsDbValidations } from 'tomeroko3-events';
import { z } from 'zod';

const {
  paymentMethod,
  payoutMethod,
  paymentRecord,
  payoutRecord,
  consultant,
} = paymentsDbValidations;

export type PaymentMethod = z.infer<typeof paymentMethod>;
export type PayoutMethod = z.infer<typeof payoutMethod>;
export type PaymentRecord = z.infer<typeof paymentRecord>;
export type PayoutRecord = z.infer<typeof payoutRecord>;
export type Consultant = z.infer<typeof consultant>;

const paymentMethodsInitializerProps: CollectionInitializerProps<PaymentMethod> = {
  collectionName: 'paymentMethods',
  documentSchema: paymentMethod,
  indexSpecs: [{ key: { userID: 1 } }],
};

const payoutMethodsInitializerProps: CollectionInitializerProps<PayoutMethod> = {
  collectionName: 'payoutMethods',
  documentSchema: payoutMethod,
  indexSpecs: [{ key: { consultantID: 1 } }],
};

const paymentRecordsInitializerProps: CollectionInitializerProps<PaymentRecord> = {
  collectionName: 'paymentRecords',
  documentSchema: paymentRecord,
  indexSpecs: [{ key: { bookingID: 1 }, unique: true }],
};

const payoutRecordsInitializerProps: CollectionInitializerProps<PayoutRecord> = {
  collectionName: 'payoutRecords',
  documentSchema: payoutRecord,
  indexSpecs: [{ key: { consultantID: 1, createdAt: -1 } }],
};

const consultantsInitializerProps: CollectionInitializerProps<Consultant> = {
  collectionName: 'consultants',
  documentSchema: consultant,
  indexSpecs: [{ key: { ID: 1 }, unique: true }],
};

export let paymentMethodsCollection: SafeCollection<PaymentMethod>;
export let payoutMethodsCollection: SafeCollection<PayoutMethod>;
export let paymentRecordsCollection: SafeCollection<PaymentRecord>;
export let payoutRecordsCollection: SafeCollection<PayoutRecord>;
export let consultantsCollection: SafeCollection<Consultant>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    paymentMethodsCollection = await collectionInitializer(paymentMethodsInitializerProps);
    payoutMethodsCollection = await collectionInitializer(payoutMethodsInitializerProps);
    paymentRecordsCollection = await collectionInitializer(paymentRecordsInitializerProps);
    payoutRecordsCollection = await collectionInitializer(payoutRecordsInitializerProps);
    consultantsCollection = await collectionInitializer(consultantsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await paymentMethodsCollection.deleteMany({});
    await payoutMethodsCollection.deleteMany({});
    await paymentRecordsCollection.deleteMany({});
    await payoutRecordsCollection.deleteMany({});
    await consultantsCollection.deleteMany({});
  });
};
