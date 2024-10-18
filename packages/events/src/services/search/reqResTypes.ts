// search.ts (request and response types)
import * as z from 'zod';
import {
  searchRequestValidation,
  searchResponseValidation,
  getRecommendationsRequestValidation,
  getRecommendationsResponseValidation,
} from './reqResValidations';

export type SearchRequestType = z.infer<typeof searchRequestValidation>;
export type SearchResponseType = z.infer<typeof searchResponseValidation>;

export type GetRecommendationsRequestType = z.infer<typeof getRecommendationsRequestValidation>;
export type GetRecommendationsResponseType = z.infer<typeof getRecommendationsResponseValidation>;
