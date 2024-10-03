// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'tomeroko3-events';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const addPaymentMethodPath = pathMap['ADD_PAYMENT_METHOD'];
router.post(
  addPaymentMethodPath.path,
  Auth('LOGGED_IN'),
  validateRequest(addPaymentMethodPath.requestValidation, addPaymentMethodPath.responseValidation),
  controller.addPaymentMethod
);

const updatePaymentMethodPath = pathMap['UPDATE_PAYMENT_METHOD'];
router.put(
  updatePaymentMethodPath.path,
  Auth('LOGGED_IN'),
  validateRequest(updatePaymentMethodPath.requestValidation, updatePaymentMethodPath.responseValidation),
  controller.updatePaymentMethod
);

const removePaymentMethodPath = pathMap['REMOVE_PAYMENT_METHOD'];
router.delete(
  removePaymentMethodPath.path,
  Auth('LOGGED_IN'),
  validateRequest(removePaymentMethodPath.requestValidation, removePaymentMethodPath.responseValidation),
  controller.removePaymentMethod
);

const addPayoutMethodPath = pathMap['ADD_PAYOUT_METHOD'];
router.post(
  addPayoutMethodPath.path,
  Auth('LOGGED_IN'),
  validateRequest(addPayoutMethodPath.requestValidation, addPayoutMethodPath.responseValidation),
  controller.addPayoutMethod
);

const updatePayoutMethodPath = pathMap['UPDATE_PAYOUT_METHOD'];
router.put(
  updatePayoutMethodPath.path,
  Auth('LOGGED_IN'),
  validateRequest(updatePayoutMethodPath.requestValidation, updatePayoutMethodPath.responseValidation),
  controller.updatePayoutMethod
);

const removePayoutMethodPath = pathMap['REMOVE_PAYOUT_METHOD'];
router.delete(
  removePayoutMethodPath.path,
  Auth('LOGGED_IN'),
  validateRequest(removePayoutMethodPath.requestValidation, removePayoutMethodPath.responseValidation),
  controller.removePayoutMethod
);
