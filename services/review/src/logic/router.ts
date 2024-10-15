// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const submitReviewPath = pathMap['SUBMIT_REVIEW'];
router.post(
  submitReviewPath.path,
  Auth('LOGGED_IN'),
  validateRequest(submitReviewPath.requestValidation, submitReviewPath.responseValidation),
  controller.submitReview,
);

const submitLongTermReviewPath = pathMap['SUBMIT_LONG_TERM_REVIEW'];
router.post(
  submitLongTermReviewPath.path,
  Auth('LOGGED_IN'),
  validateRequest(submitLongTermReviewPath.requestValidation, submitLongTermReviewPath.responseValidation),
  controller.submitLongTermReview,
);

const getConsultantReviewsPath = pathMap['GET_CONSULTANT_REVIEWS'];
router.get(
  getConsultantReviewsPath.path,
  Auth('OPTIONAL'),
  validateRequest(getConsultantReviewsPath.requestValidation, getConsultantReviewsPath.responseValidation),
  controller.getConsultantReviews,
);

const getTopicReviewsPath = pathMap['GET_TOPIC_REVIEWS'];
router.get(
  getTopicReviewsPath.path,
  Auth('OPTIONAL'),
  validateRequest(getTopicReviewsPath.requestValidation, getTopicReviewsPath.responseValidation),
  controller.getTopicReviews,
);
