import { AppError, OptionalID, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import crypto from 'crypto';
import {
  SendNotificationFundumentalEventType,
  SignupEmailPart2RequestType,
  SignupEmailRequestType,
  SignupEmailResponseType,
  UpdateProfileRequestType,
  UpdateProfileResponseType,
} from 'events-tomeroko3';
import httpStatus from 'http-status';

import { Pincode, User } from '../configs/mongoDB/initialization';
import {
  sendNotificationFundumentalPublisher,
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
    await model.deletePincode(email);
    return { userID };
  });
};

export const updateProfile = async (props: UpdateProfileRequestType['body']): Promise<UpdateProfileResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const updateResult = await model.updateUserByID(userID, props);
    if (updateResult?.matchedCount === 0) {
      throwUserNotFoundError(userID);
    }
    const updatedUser = (await model.getUserByID(userID)) as User;
    userUpdatedPublisher(updatedUser);
    return { message: 'Profile updated successfully' };
  });
};

export const deactivateProfile = async (): Promise<void> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(
        appErrorCodes.USER_NOT_FOUND,
        { userID, description: 'user tried to deactivate himself (delete accout) but was not found in db' },
        false,
        'INTERNAL_SERVER_ERROR',
        {},
        httpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const updateResult = await model.updateUserByID(userID, { isActive: false });
    if (updateResult?.matchedCount === 0) {
      throwUserNotFoundError(userID);
    }
    userDeactivatedPublisher({ userID });
    //todo: add logout logic
  });
};

const signupEmailValidatePincode = async (email: string, pincode: string): Promise<void> => {
  return functionWrapper(async () => {
    const pincodeEntry = await model.findPincode(email);
    validatePincodeExist(pincodeEntry, email);
    validatePincodeMatch(pincode, pincodeEntry as Pincode, email);
    validatePincodeNotExpired(pincodeEntry as Pincode);
  });
};

const signupEmailCreateNewUser = async (
  props: SignupEmailPart2RequestType['body'],
): Promise<{ userProps: any; userID: string }> => {
  return functionWrapper(async () => {
    const { email, password, firstName, lastName, phone } = props;
    const hashedPassword = crypto.pbkdf2Sync('password', 'fixedSalt', 1000, 64, 'sha512').toString('hex');
    const userProps: OptionalID<User> = {
      email,
      firstName,
      lastName,
      hashedPassword,
      isActive: true,
      phone,
    };

    const userID = await model.createUser(userProps);
    //todo : add error handling for user allready exist
    return { userProps, userID };
  });
};

const signupEmailHandleNewPincode = async (email: string): Promise<void> => {
  return functionWrapper(async () => {
    const pincode = generatePincode();
    await model.savePincode(email, pincode);

    const notification: SendNotificationFundumentalEventType['data'] = {
      addresses: [
        {
          address: email,
          channel: 'EMAIL',
        },
      ],
      content: {
        subject: 'Your Verification Code',
        body: `Your verification code is ${pincode}`,
      },
    };
    sendNotificationFundumentalPublisher(notification);
  });
};

const signupEmailValidateEmailIsNew = async (email: string): Promise<void> => {
  return functionWrapper(async () => {
    const existingUser = await model.getUserByEmail(email);
    if (existingUser) {
      throw new AppError(
        appErrorCodes.EMAIL_ALREADY_REGISTERED,
        { email },
        true,
        'EMAIL_ALREADY_REGISTERED',
        { email },
        httpStatus.CONFLICT,
      );
    }
  });
};

const throwUserNotFoundError = (userID: string) => {
  throw new AppError(
    appErrorCodes.USER_NOT_FOUND,
    { userID, description: 'user tried to update himself but was not found in db' },
    false,
    'INTERNAL_SERVER_ERROR',
    {},
    httpStatus.INTERNAL_SERVER_ERROR,
  );
};

const validatePincodeNotExpired = (pincodeEntry: Pincode) => {
  return functionWrapper(() => {
    const now = new Date();
    const diff = now.getTime() - pincodeEntry.createdAt.getTime();
    // todo: move the 10 * 60 * 1000 to a system variable
    if (diff > 10 * 60 * 1000) {
      throw new AppError(
        appErrorCodes.VALIDATE_PINCODE_PINCODE_EXPIRED,
        { diff },
        true,
        'PINCODE_EXPIRED',
        {},
        httpStatus.CONFLICT,
      );
    }
  });
};

const validatePincodeMatch = (pincode: string, pincodeEntry: Pincode, email: string) => {
  return functionWrapper(() => {
    if (parseInt(pincode) !== parseInt(pincodeEntry.pincode)) {
      // for some reason, a classic string comparison always returns false
      throw new AppError(
        appErrorCodes.VALIDATE_PINCODE_PINCODE_WRONG,
        { email, pincode, expectedPincode: pincodeEntry.pincode },
        true,
        'WRONG_PINCODE',
        {},
        httpStatus.CONFLICT,
      );
    }
  });
};

const validatePincodeExist = (pincodeEntry: Pincode | null, email: string) => {
  return functionWrapper(() => {
    if (!pincodeEntry) {
      throw new AppError(
        appErrorCodes.VALIDATE_PINCODE_PINCODE_NOT_FOUND,
        { email, description: 'pincode not found in db, maybe user skkiped previous request in the flow' },
        true,
        'PINCODE_NOT_EXIST_FOR_THIS_EMAIL',
        { description: 'make sure you went through previous request in the flow' },
        httpStatus.CONFLICT,
      );
    }
  });
};
