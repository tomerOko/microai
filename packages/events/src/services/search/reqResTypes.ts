// search.ts (request and response types)
import * as z from 'zod';
import {
  searchRequestValidation,
  searchResponseValidation,
  getRecommendationsRequestValidation,
  getRecommendationsResponseValidation,
} from '../validation/search';

export type searchRequestType = z.infer<typeof searchRequestValidation>;
export type searchResponseType = z.infer<typeof searchResponseValidation>;

export type getRecommendationsRequestType = z.infer<typeof getRecommendationsRequestValidation>;
export type getRecommendationsResponseType = z.infer<typeof getRecommendationsResponseValidation>;
