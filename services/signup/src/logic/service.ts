// service.ts
import {
  AppError,
  functionWrapper,
  generatePincode,
  hashPassword,
  comparePassword,
  getAuthenticatedID,
} from 'common-lib-tomeroko3';
import {
  sendPincodeRequestType,
  sendPincodeResponseType,
  signupRequestType,
  signupResponseType,
  signupOAuthRequestType,
  signupOAuthResponseType,
  addAuthMethodRequestType,
  addAuthMethodResponseType,
  updateProfileRequestType,
  updateProfileResponseType,
  updatePasswordRequestType,
  updatePasswordResponseType,
} from 'events-tomeroko3';

import {
  userCreatedPublisher,
  sendPincodeEmailPublisher,
  newPasswordSetPublisher,
  oauthLinkedPublisher,
  authMethodAddedPublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const sendPincode = async (props: sendPincodeRequestType['body']): Promise<sendPincodeResponseType> => {
  return functionWrapper(async () => {
    const { email } = props;
    const pincode = generatePincode();
    await model.savePincode(email, pincode);
    sendPincodeEmailPublisher({ email, pincode });
    return {};
  });
};

export const signup = async (props: signupRequestType['body']): Promise<signupResponseType> => {
  return functionWrapper(async () => {
    const { email, pincode, firstName, lastName, password } = props;
    const isValid = await model.validatePincode(email, pincode);
    if (!isValid) {
      throw new AppError(appErrorCodes.INVALID_PINCODE, { email });
    }
    const hashedPassword = await hashPassword(password);
    const user = { email, firstName, lastName, password: hashedPassword, authMethods: ['email'] };
    const userID = await model.createUser(user);
    userCreatedPublisher({ userID, email, firstName, lastName });
    newPasswordSetPublisher({ userID, email });
    return { userID };
  });
};

export const signupOAuth = async (props: signupOAuthRequestType['body']): Promise<signupOAuthResponseType> => {
  return functionWrapper(async () => {
    const { oauthProvider, oauthToken } = props;
    const oauthData = await verifyOAuthToken(oauthProvider, oauthToken);
    const { email, firstName, lastName } = oauthData;
    const user = { email, firstName, lastName, authMethods: [oauthProvider], oauthData };
    const userID = await model.createUser(user);
    userCreatedPublisher({ userID, email, firstName, lastName });
    oauthLinkedPublisher({ userID, email, oauthProvider });
    return { userID };
  });
};

export const addAuthenticationMethod = async (props: addAuthMethodRequestType['body']): Promise<addAuthMethodResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }
    const { method } = props;
    if (method.type === 'email') {
      const { email } = method;
      const pincode = generatePincode();
      await model.savePincode(email, pincode);
      sendPincodeEmailPublisher({ email, pincode });
    } else if (method.type === 'oauth') {
      const { oauthProvider, oauthToken } = method;
      const oauthData = await verifyOAuthToken(oauthProvider, oauthToken);
      await model.addAuthMethod(userID, oauthProvider);
      authMethodAddedPublisher({ userID, method: oauthProvider });
    }
    return {};
  });
};

export const updateProfile = async (props: updateProfileRequestType['body']): Promise<updateProfileResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }
    await model.updateUserByID(userID, props.profile);
    return {};
  });
};

export const updatePassword = async (props: updatePasswordRequestType['body']): Promise<updatePasswordResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { oldPassword, newPassword } = props;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      throw new AppError(appErrorCodes.INVALID_OLD_PASSWORD, { userID });
    }
    const hashedPassword = await hashPassword(newPassword);
    await model.updateUserByID(userID, { password: hashedPassword });
    newPasswordSetPublisher({ userID, email: user.email });
    return {};
  });
};

// Helper function to verify OAuth token
async function verifyOAuthToken(oauthProvider: string, oauthToken: string): Promise<{ email: string; firstName: string; lastName: string }> {
  // Implement OAuth token verification logic here
  // This is just a placeholder implementation
  return { email: 'email@example.com', firstName: 'FirstName', lastName: 'LastName' };
}
