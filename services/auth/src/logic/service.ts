 // service.ts
import { AppError, functionWrapper } from 'common-lib-tomeroko3';
import {
  loginRequestType,
  loginResponseType,
  oauthLoginRequestType,
  oauthLoginResponseType,
} from 'events-tomeroko3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { authSuccessPublisher, authFailurePublisher } from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const login = async (props: loginRequestType['body']): Promise<loginResponseType> => {
  return functionWrapper(async () => {
    const { email, password } = props;
    const user = await model.getUserByEmail(email);
    if (!user || !user.passwordHash) {
      authFailurePublisher({ email, reason: 'Invalid credentials' });
      throw new AppError(appErrorCodes.INVALID_CREDENTIALS, { email });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      authFailurePublisher({ email, reason: 'Invalid credentials' });
      throw new AppError(appErrorCodes.INVALID_CREDENTIALS, { email });
    }
    const token = jwt.sign({ userID: user.ID }, JWT_SECRET, { expiresIn: '1h' });
    authSuccessPublisher({ userID: user.ID });
    return { token };
  });
};

export const oauthLogin = async (
  props: oauthLoginRequestType['body'],
): Promise<oauthLoginResponseType> => {
  return functionWrapper(async () => {
    const { provider, providerToken } = props;
    // Verify the provider token with the OAuth provider.
    // This is a placeholder for actual OAuth verification logic.
    const providerID = await verifyOAuthToken(provider, providerToken);
    if (!providerID) {
      authFailurePublisher({ provider, reason: 'Invalid OAuth token' });
      throw new AppError(appErrorCodes.INVALID_OAUTH_TOKEN, { provider });
    }
    const user = await model.getUserByOAuthProviderID(provider, providerID);
    if (!user) {
      authFailurePublisher({ provider, reason: 'User not found' });
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { provider, providerID });
    }
    const token = jwt.sign({ userID: user.ID }, JWT_SECRET, { expiresIn: '1h' });
    authSuccessPublisher({ userID: user.ID });
    return { token };
  });
};

// Placeholder function for OAuth token verification.
async function verifyOAuthToken(provider: string, token: string): Promise<string | null> {
  // Implement actual OAuth token verification logic here.
  // Return the providerID (unique ID of the user in the OAuth provider's system) if valid.
  return 'providerUniqueID';
}
