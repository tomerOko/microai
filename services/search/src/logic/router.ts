// router.ts
import { validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const searchPath = pathMap['SEARCH'];
router.post(
  searchPath.path,
  validateRequest(searchPath.requestValidation, searchPath.responseValidation),
  controller.search,
);

const getRecommendationsPath = pathMap['GET_RECOMMENDATIONS'];
router.get(
  getRecommendationsPath.path,
  validateRequest(getRecommendationsPath.requestValidation, getRecommendationsPath.responseValidation),
  controller.getRecommendations,
);
