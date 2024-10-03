// configs/rabbitMQ/initialization.ts
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  CallEndedEventType,
  PaymentMethodAddedEventType,
  PaymentMethodUpdatedEventType,
  PaymentMethodRemovedEventType,
  PayoutMethodAddedEventType,
  PayoutMethodUpdatedEventType,
  PayoutMethodRemovedEventType,
  PaymentProcessedEventType,
  PaymentFailedEventType,
  ReceiptGeneratedEventType,
  PayoutProcessedEventType,
  PayoutFailedEventType,
  PayoutReceiptGeneratedEventType,
  callEventsNames,
  paymentEventsNames,
  callEndedEventValidation,
  paymentMethodAddedEventValidation,
  paymentMethodUpdatedEventValidation,
  paymentMethodRemovedEventValidation,
  payoutMethodAddedEventValidation,
  payoutMethodUpdatedEventValidation,
  payoutMethodRemovedEventValidation,
  paymentProcessedEventValidation,
  paymentFailedEventValidation,
  receiptGeneratedEventValidation,
  payoutProcessedEventValidation,
  payoutFailedEventValidation,
  payoutReceiptGeneratedEventValidation,
} from 'tomeroko3-events';

import { handleCallEndedEvent } from '../../consumers';

export let paymentMethodAddedPublisher: (data: PaymentMethodAddedEventType['data']) => void;
export let paymentMethodUpdatedPublisher: (data: PaymentMethodUpdatedEventType['data']) => void;
export let paymentMethodRemovedPublisher: (data: PaymentMethodRemovedEventType['data']) => void;

export let payoutMethodAddedPublisher: (data: PayoutMethodAddedEventType['data']) => void;
export let payoutMethodUpdatedPublisher: (data: PayoutMethodUpdatedEventType['data']) => void;
export let payoutMethodRemovedPublisher: (data: PayoutMethodRemovedEventType['data']) => void;

export let paymentProcessedPublisher: (data: PaymentProcessedEventType['data']) => void;
export let paymentFailedPublisher: (data: PaymentFailedEventType['data']) => void;
export let receiptGeneratedPublisher: (data: ReceiptGeneratedEventType['data']) => void;

export let payoutProcessedPublisher: (data: PayoutProcessedEventType['data']) => void;
export let payoutFailedPublisher: (data: PayoutFailedEventType['data']) => void;
export let payoutReceiptGeneratedPublisher: (data: PayoutReceiptGeneratedEventType['data']) => void;

const paymentMethodAddedPublisherParams: RabbitPublisherParams<PaymentMethodAddedEventType> = {
  eventName: paymentEventsNames.PAYMENT_METHOD_ADDED,
  eventSchema: paymentMethodAddedEventValidation,
};

const paymentMethodUpdatedPublisherParams: RabbitPublisherParams<PaymentMethodUpdatedEventType> = {
  eventName: paymentEventsNames.PAYMENT_METHOD_UPDATED,
  eventSchema: paymentMethodUpdatedEventValidation,
};

const paymentMethodRemovedPublisherParams: RabbitPublisherParams<PaymentMethodRemovedEventType> = {
  eventName: paymentEventsNames.PAYMENT_METHOD_REMOVED,
  eventSchema: paymentMethodRemovedEventValidation,
};

const payoutMethodAddedPublisherParams: RabbitPublisherParams<PayoutMethodAddedEventType> = {
  eventName: paymentEventsNames.PAYOUT_METHOD_ADDED,
  eventSchema: payoutMethodAddedEventValidation,
};

const payoutMethodUpdatedPublisherParams: RabbitPublisherParams<PayoutMethodUpdatedEventType> = {
  eventName: paymentEventsNames.PAYOUT_METHOD_UPDATED,
  eventSchema: payoutMethodUpdatedEventValidation,
};

const payoutMethodRemovedPublisherParams: RabbitPublisherParams<PayoutMethodRemovedEventType> = {
  eventName: paymentEventsNames.PAYOUT_METHOD_REMOVED,
  eventSchema: payoutMethodRemovedEventValidation,
};

const paymentProcessedPublisherParams: RabbitPublisherParams<PaymentProcessedEventType> = {
  eventName: paymentEventsNames.PAYMENT_PROCESSED,
  eventSchema: paymentProcessedEventValidation,
};

const paymentFailedPublisherParams: RabbitPublisherParams<PaymentFailedEventType> = {
  eventName: paymentEventsNames.PAYMENT_FAILED,
  eventSchema: paymentFailedEventValidation,
};

const receiptGeneratedPublisherParams: RabbitPublisherParams<ReceiptGeneratedEventType> = {
  eventName: paymentEventsNames.RECEIPT_GENERATED,
  eventSchema: receiptGeneratedEventValidation,
};

const payoutProcessedPublisherParams: RabbitPublisherParams<PayoutProcessedEventType> = {
  eventName: paymentEventsNames.PAYOUT_PROCESSED,
  eventSchema: payoutProcessedEventValidation,
};

const payoutFailedPublisherParams: RabbitPublisherParams<PayoutFailedEventType> = {
  eventName: paymentEventsNames.PAYOUT_FAILED,
  eventSchema: payoutFailedEventValidation,
};

const payoutReceiptGeneratedPublisherParams: RabbitPublisherParams<PayoutReceiptGeneratedEventType> = {
  eventName: paymentEventsNames.PAYOUT_RECEIPT_GENERATED,
  eventSchema: payoutReceiptGeneratedEventValidation,
};

const callEndedSubscriberParams: RabbitSubscriberParams<CallEndedEventType> = {
  thisServiceName: 'PAYMENTS_SERVICE',
  eventName: callEventsNames.CALL_ENDED,
  eventSchema: callEndedEventValidation,
  handler: handleCallEndedEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    // Initialize subscribers
    await initializeRabbitSubscriber(callEndedSubscriberParams);

    // Initialize publishers
    paymentMethodAddedPublisher = await rabbitPublisherFactory(paymentMethodAddedPublisherParams);
    paymentMethodUpdatedPublisher = await rabbitPublisherFactory(paymentMethodUpdatedPublisherParams);
    paymentMethodRemovedPublisher = await rabbitPublisherFactory(paymentMethodRemovedPublisherParams);

    payoutMethodAddedPublisher = await rabbitPublisherFactory(payoutMethodAddedPublisherParams);
    payoutMethodUpdatedPublisher = await rabbitPublisherFactory(payoutMethodUpdatedPublisherParams);
    payoutMethodRemovedPublisher = await rabbitPublisherFactory(payoutMethodRemovedPublisherParams);

    paymentProcessedPublisher = await rabbitPublisherFactory(paymentProcessedPublisherParams);
    paymentFailedPublisher = await rabbitPublisherFactory(paymentFailedPublisherParams);
    receiptGeneratedPublisher = await rabbitPublisherFactory(receiptGeneratedPublisherParams);

    payoutProcessedPublisher = await rabbitPublisherFactory(payoutProcessedPublisherParams);
    payoutFailedPublisher = await rabbitPublisherFactory(payoutFailedPublisherParams);
    payoutReceiptGeneratedPublisher = await rabbitPublisherFactory(payoutReceiptGeneratedPublisherParams);
  });
};
