import * as amqp from 'amqplib';
import z from 'zod';

import { AppError, formatZodError } from '../errors';
import { functionWrapper, logger } from '../logging';

import { channel } from './connect';
import { EventStracture } from './types';

export type RabbitSubscriberParams<T extends EventStracture> = {
  thisServiceName: string;
  eventName: string;
  eventSchema: z.Schema<T, any, any>;
  handler: (event: T['data']) => Promise<void>;
};

export const initializeRabbitSubscriber = async <T extends EventStracture>(params: RabbitSubscriberParams<T>): Promise<void> => {
  if (!channel) {
    throw new AppError('RABBIT_CHANNEL_NOT_INITIALIZED', {}, false, 'INTERNAL_SERVER_ERROR', {}, 500);
  }

  const { thisServiceName, eventName } = params;

  const exchange = `${eventName}_EVENTS`;
  const queue = `${eventName}_${thisServiceName}_QUEUE`;
  const deadLetterExchange = 'dead_letter_exchange';

  await channel.assertExchange(exchange, 'fanout', { durable: true });
  await channel.assertExchange(deadLetterExchange, 'direct', { durable: true });
  await channel.assertQueue(queue, {
    durable: true,
    deadLetterExchange: deadLetterExchange,
    deadLetterRoutingKey: `${thisServiceName}_dead_letter`,
  });
  await channel.bindQueue(queue, exchange, '');

  const options = { noAck: false };
  channel.consume(queue, consumerCallbackFactory<T>(params), options);
};

const parseMessage = (msg: amqp.Message) => {
  const result = JSON.parse(msg!.content.toString());
  return result;
};

const consumerCallbackFactory = <T extends EventStracture>(
  params: RabbitSubscriberParams<T>,
): ((msg: amqp.Message | null) => void) => {
  const callback = async (msg: amqp.Message | null) => {
    return functionWrapper(async () => {
      if (msg !== null) {
        const message = parseMessage(msg);
        if (!message) {
          channel.ack(msg);
        } else {
          validateConsumedEvent<T>(msg, params);
          await handleConsumedEvent<T>(msg, params);
        }
      }
    });
  };
  return callback;
};

const handleConsumedEvent = async <T extends EventStracture>(msg: amqp.Message, params: RabbitSubscriberParams<T>) => {
  const { eventName, handler } = params;
  const message = parseMessage(msg);
  try {
    await handler((message as T).data);
    channel.ack(msg);
  } catch (error) {
    logger.error({
      additionalData: { error, eventName },
      customMessage: 'Failed to process consumed event',
    });
    channel.nack(msg, false, true);
  }
};

const validateConsumedEvent = <T extends EventStracture>(msg: amqp.Message, params: RabbitSubscriberParams<T>) => {
  const { eventSchema, eventName } = params;
  const message = parseMessage(msg);
  try {
    eventSchema.parse(message);
  } catch (error: any) {
    channel.nack(msg, false, true);
    logger.error({
      additionalData: { error: formatZodError(error), eventName },
      customMessage: 'Invalid consumed event data',
    });
  }
};
