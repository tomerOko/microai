import { initializeCommonUtils, nodeEnvironments } from 'common-lib-tomeroko3';
import 'source-map-support/register';

import { setupMongo } from './configs/mongoDB';
import { setupRabbitMQ } from './configs/rabbitMQ';

import { initializeServer } from './server';
import { ENVs } from './configs/ENVs';

const start = async () => {
  console.log('Starting server...');

  initializeCommonUtils({
    IS_PROD: ENVs.env == nodeEnvironments.PROD,
    JWT_SECRET: ENVs.jwtSecret,
    SERVICE_NAME: ENVs.serviceName,
  });
  await setupMongo();

  await setupRabbitMQ();

  await initializeServer();
};

start();
