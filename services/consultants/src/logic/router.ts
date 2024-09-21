// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const becomeConsultant = pathMap['BECOME_CONSULTANT'];
router.post(
  becomeConsultant.path,
  Auth('LOGGED_IN'),
  validateRequest(becomeConsultant.requestValidation, becomeConsultant.responseValidation),
  controller.becomeConsultant,
);

const updateConsultantProfile = pathMap['UPDATE_CONSULTANT_PROFILE'];
router.put(
  updateConsultantProfile.path,
  Auth('LOGGED_IN'),
  validateRequest(updateConsultantProfile.requestValidation, updateConsultantProfile.responseValidation),
  controller.updateConsultantProfile,
);

const addTopic = pathMap['ADD_TOPIC'];
router.post(
  addTopic.path,
  Auth('LOGGED_IN'),
  validateRequest(addTopic.requestValidation, addTopic.responseValidation),
  controller.addTopic,
);

const updateTopic = pathMap['UPDATE_TOPIC'];
router.put(
  updateTopic.path,
  Auth('LOGGED_IN'),
  validateRequest(updateTopic.requestValidation, updateTopic.responseValidation),
  controller.updateTopic,
);

const removeTopic = pathMap['REMOVE_TOPIC'];
router.delete(
  removeTopic.path,
  Auth('LOGGED_IN'),
  validateRequest(removeTopic.requestValidation, removeTopic.responseValidation),
  controller.removeTopic,
);
