// service.ts
import { AppError, functionWrapper, generatePincode, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  signupEmailRequestType,
  signupEmailResponseType,
  completeClassicSignupRequestType,
  completeClassicSignupResponseType,
  signupOAuthRequestType,
  signupOAuthResponseType,
  addAuthMethodRequestType,
  addAuthMethodResponseType,
  updateProfileRequestType,
  updateProfileResponseType,
  deactivateProfileRequestType,
  deactivateProfileResponseType,
} from 'events-tomeroko3';

import {
  sendNotificationPublisher,
  userCreatedPublisher,
  userUpdatedPublisher,
  userDeactivatedPublisher,
  newPasswordSetPublisher,
  oauthLinkedPublisher,
  authMethodAddedPublisher,
} from '../configs/rabbitMQ/initialization';

import * as model from './dal';
import { appErrorCodes } from './appErrorCodes';
import bcrypt from 'bcrypt';

export const signupEmail = async (props: signupEmailRequestType['body']): Promise<signupEmailResponseType> => {
  return functionWrapper(async () => {
    const { email } = props;
    const existingUser = await model.getUserByEmail(email);
    if (existingUser) {
      throw new AppError(appErrorCodes.EMAIL_ALREADY_REGISTERED, { email });
    }
    const pincode = generatePincode();
    await model.savePincode(email, pincode);

    // Publish SEND_NOTIFICATION event
    const notification: SendNotificationEventType['data'] = {
      type: 'EMAIL',
      recipient: email,
      subject: 'Your Verification Code',
      message: `Your verification code is ${pincode}`,
    };
    sendNotificationPublisher(notification);

    return { message: 'Pincode sent to your email' };
  });
};

export const completeClassicSignup = async (
  props: completeClassicSignupRequestType['body'],
): Promise<completeClassicSignupResponseType> => {
  return functionWrapper(async () => {
    const { email, pincode, firstName, lastName, password } = props;
    const valid = await model.verifyPincode(email, pincode);
    if (!valid) {
      throw new AppError(appErrorCodes.INVALID_PINCODE, { email });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userProps = {
      email,
      firstName,
      lastName,
      authenticationMethods: [
        {
          method: 'EMAIL_PASSWORD',
          email,
          password: hashedPassword,
        },
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userID = await model.createUser(userProps);

    // Publish USER_CREATED event
    userCreatedPublisher({ ...userProps, ID: userID });

    // Publish NEW_PASSWORD_SET event
    newPasswordSetPublisher({ userID });

    return { userID };
  });
};

export const signupOAuth = async (props: signupOAuthRequestType['body']): Promise<signupOAuthResponseType> => {
  return functionWrapper(async () => {
    const { oauthProvider, oauthToken } = props;
    const oauthUserInfo = await verifyOAuthToken(oauthProvider, oauthToken);
    const { email, firstName, lastName } = oauthUserInfo;

    let user = await model.getUserByEmail(email);

    if (!user) {
      // Create new user
      const userProps = {
        email,
        firstName,
        lastName,
        authenticationMethods: [
          {
            method: 'OAUTH',
            oauthProvider,
            oauthToken,
          },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const userID = await model.createUser(userProps);

      // Publish USER_CREATED event
      userCreatedPublisher({ ...userProps, ID: userID });

      // Publish OAUTH_LINKED event
      oauthLinkedPublisher({ userID, oauthProvider });

      return { userID };
    } else {
      // User exists, add OAuth method
      await model.addAuthMethod(user.ID, {
        method: 'OAUTH',
        oauthProvider,
        oauthToken,
      });

      // Publish OAUTH_LINKED event
      oauthLinkedPublisher({ userID: user.ID, oauthProvider });

      return { userID: user.ID };
    }
  });
};

export const addAuthMethod = async (
  props: addAuthMethodRequestType['body'],
): Promise<addAuthMethodResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const authenticationMethod = props.authenticationMethod;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }

    if (authenticationMethod.method === 'EMAIL_PASSWORD') {
      const { email, password } = authenticationMethod;
      if (!email || !password) {
        throw new AppError(appErrorCodes.INVALID_AUTH_METHOD_DATA, {});
      }

      const existingMethod = user.authenticationMethods.find(
        (method) => method.method === 'EMAIL_PASSWORD' && method.email === email,
      );

      if (existingMethod) {
        throw new AppError(appErrorCodes.AUTH_METHOD_ALREADY_EXISTS, { email });
      }

      const pincode = generatePincode();
      await model.savePincode(email, pincode);

      // Publish SEND_NOTIFICATION event
      const notification: SendNotificationEventType['data'] = {
        type: 'EMAIL',
        recipient: email,
        subject: 'Your Verification Code',
        message: `Your verification code is ${pincode}`,
      };
      sendNotificationPublisher(notification);

      return { message: 'Pincode sent to your email' };
    } else if (authenticationMethod.method === 'OAUTH') {
      const { oauthProvider, oauthToken } = authenticationMethod;
      const oauthUserInfo = await verifyOAuthToken(oauthProvider!, oauthToken!);

      await model.addAuthMethod(userID, {
        method: 'OAUTH',
        oauthProvider,
        oauthToken,
      });

      // Publish AUTH_METHOD_ADDED event
      authMethodAddedPublisher({ userID, method: 'OAUTH', oauthProvider });

      return { message: 'OAuth method added successfully' };
    } else {
      throw new AppError(appErrorCodes.INVALID_AUTH_METHOD_TYPE, {});
    }
  });
};

export const updateProfile = async (
  props: updateProfileRequestType['body'],
): Promise<updateProfileResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { profile } = props;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }

    await model.updateUserByID(userID, profile);

    // Publish USER_UPDATED event
    userUpdatedPublisher({ userID, updatedFields: profile });

    return { message: 'Profile updated successfully' };
  });
};

export const deactivateProfile = async (
  props: deactivateProfileRequestType['body'],
): Promise<deactivateProfileResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }

    await model.updateUserByID(userID, { isActive: false });

    // Publish USER_DEACTIVATED event
    userDeactivatedPublisher({ userID });

    return { message: 'User profile deactivated successfully' };
  });
};

const verifyOAuthToken = async (provider: string, token: string) => {
  // Implement OAuth token verification logic here
  // For the sake of this example, we'll assume the token is valid and return dummy data
  return {
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
  };
};
