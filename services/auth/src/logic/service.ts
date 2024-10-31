import { AppError, functionWrapper } from 'common-lib-tomeroko3';
import crypto from 'crypto';
import { PasswordLoginRequestType, PasswordLoginResponseType } from 'events-tomeroko3';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import { authFailurePublisher, authSuccessPublisher } from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const login = async (props: PasswordLoginRequestType['body']): Promise<PasswordLoginResponseType> => {
  return functionWrapper(async () => {
    const { email, password } = props;
    const user = await model.getUserByEmail(email);
    if (!user) {
      authFailurePublisher({ email, reason: 'Invalid credentials' });
      throw new AppError(
        appErrorCodes.INVALID_CREDENTIALS_EMAIL,
        { email },
        true,
        'EMAIL_NOT_FOUND_AT_LOGIN',
        {},
        httpStatus.CONFLICT,
      );
    }

    const hashedPassword = crypto.pbkdf2Sync('password', 'fixedSalt', 1000, 64, 'sha512').toString('hex');
    const isPasswordValid = hashedPassword == user.hasedPassword;
    if (!isPasswordValid) {
      authFailurePublisher({ email, reason: 'Invalid credentials' });
      throw new AppError(
        appErrorCodes.INVALID_CREDENTIALS_PASSWORD,
        { email },
        true,
        'PASSWORD_NOT_MATCH',
        {},
        httpStatus.CONFLICT,
      );
    }
    const token = jwt.sign({ userID: user.ID }, JWT_SECRET, { expiresIn: '1h' });
    authSuccessPublisher({ userId: user.ID });
    const result: PasswordLoginResponseType = { token };
    return result;
  });
};
