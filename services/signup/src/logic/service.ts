// service.ts
import { hash } from 'bcrypt';
import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import 'events-tomeroko3';
import {
  SendNotificationEventType,
  SignupEmailPart2RequestType,
  SignupEmailRequestType,
  SignupEmailResponseType,
  UpdateProfileRequestType,
  UpdateProfileResponseType,
} from 'events-tomeroko3';

import {
  newPasswordSetPublisher,
  sendNotificationPublisher,
  userCreatedPublisher,
  userDeactivatedPublisher,
  userUpdatedPublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';
import { generatePincode } from './utils';

export const signupEmail = async (props: SignupEmailRequestType['body']): Promise<SignupEmailResponseType> => {
  return functionWrapper(async () => {
    const { email } = props;
    await signupEmailValidateEmailIsNew(email);
    await signupEmailHandleNewPincode(email);
    return { message: 'Pincode sent to your email' };
  });
};

export const signupEmailPart2 = async (props: SignupEmailPart2RequestType['body']) => {
  return functionWrapper(async () => {
    const { email, pincode } = props;
    await signupEmailValidatePincode(email, pincode);
    const { userProps, userID } = await signupEmailCreateNewUser(props);
    userCreatedPublisher({ ...userProps, ID: userID });
    newPasswordSetPublisher({ userID });
    return { userID };
  });
};

export const updateProfile = async (props: UpdateProfileRequestType['body']): Promise<UpdateProfileResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { email, firstName, lastName } = props;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }

    await model.updateUserByID(userID, { email, firstName, lastName });

    // Publish USER_UPDATED event
    userUpdatedPublisher({ userID, updatedFields: profile });

    return { message: 'Profile updated successfully' };
  });
};

export const deactivateProfile = async (props: deactivateProfileRequestType['body']): Promise<deactivateProfileResponseType> => {
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

async function signupEmailValidatePincode(email: string, pincode: string) {
  const valid = await model.validatePincode(email, pincode);
  if (!valid) {
    throw new AppError(appErrorCodes.INVALID_PINCODE, { email });
  }
}

async function signupEmailCreateNewUser(props: SignupEmailPart2RequestType['body']) {
  const { email, password, firstName, lastName } = props;
  const hashedPassword = await hash(password, 10);
  const userProps = {
    email,
    firstName,
    lastName,
    hashedPassword,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userID = await model.createUser(userProps);
  return { userProps, userID };
}

async function signupEmailHandleNewPincode(email: string) {
  const pincode = generatePincode();
  await model.savePincode(email, pincode);

  const notification: SendNotificationEventType['data'] = {
    type: 'EMAIL',
    recipient: email,
    subject: 'Your Verification Code',
    message: `Your verification code is ${pincode}`,
  };
  sendNotificationPublisher(notification);
}

async function signupEmailValidateEmailIsNew(email: string) {
  const existingUser = await model.getUserByEmail(email);
  if (existingUser) {
    throw new AppError(appErrorCodes.EMAIL_ALREADY_REGISTERED, { email });
  }
}
