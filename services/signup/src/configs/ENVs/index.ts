import { nodeEnvironments } from 'common-lib-tomeroko3';
import { config } from 'dotenv';

import { envsValidation } from './ENVsValidation';

if ([nodeEnvironments.EXTERANL_DEV, nodeEnvironments.EXTERNAL_TEST].includes(process.env.NODE_ENV as any)) {
  config({ path: './external_development.env' });
}

const validatedENVs = envsValidation(process.env);

export const ENVs = {
  env: validatedENVs.NODE_ENV || nodeEnvironments.DEV,
  port: validatedENVs.PORT || 3000,
  serviceName: validatedENVs.SERVICE_NAME,
  mongo: {
    host: validatedENVs.MONGO_HOST,
    port: validatedENVs.MONGO_PORT,
    dbName: validatedENVs.MONGO_DB_NAME,
  },
  rabbit: {
    host: validatedENVs.RABBITMQ_HOST,
    port: validatedENVs.RABBITMQ_PORT,
    username: validatedENVs.RABBITMQ_USERNAME,
    password: validatedENVs.RABBITMQ_PASSWORD,
  },
  jwtSecret: validatedENVs.JWT_SECRET,
  stringEncryptionSecret: validatedENVs,
};
