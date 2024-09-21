// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);

const sendPincode = pathMap['SEND_PINCODE'];
router.post(
  sendPincode.path,
  validateRequest(sendPincode.requestValidation, sendPincode.responseValidation),
  controller.sendPincode,
);

const signup = pathMap['SIGNUP'];
router.post(
  signup.path,
  validateRequest(signup.requestValidation, signup.responseValidation),
  controller.signup,
);

const signupOAuth = pathMap['SIGNUP_OAUTH'];
router.post(
  signupOAuth.path,
  validateRequest(signupOAuth.requestValidation, signupOAuth.responseValidation),
  controller.signupOAuth,
);

const addAuthMethod = pathMap['ADD_AUTH_METHOD'];
router.post(
  addAuthMethod.path,
  Auth('LOGGED_IN'),
  validateRequest(addAuthMethod.requestValidation, addAuthMethod.responseValidation),
  controller.addAuthenticationMethod,
);

const updateProfile = pathMap['UPDATE_PROFILE'];
router.put(
  updateProfile.path,
  Auth('LOGGED_IN'),
  validateRequest(updateProfile.requestValidation, updateProfile.responseValidation),
  controller.updateProfile,
);

const updatePassword = pathMap['UPDATE_PASSWORD'];
router.put(
  updatePassword.path,
  Auth('LOGGED_IN'),
  validateRequest(updatePassword.requestValidation, updatePassword.responseValidation),
  controller.updatePassword,
);
