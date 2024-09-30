// service.ts
import { functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  searchRequestType,
  searchResponseType,
  getRecommendationsRequestType,
  getRecommendationsResponseType,
} from 'events-tomeroko3';

import * as model from './dal';

export const search = async (props: searchRequestType['body']): Promise<searchResponseType> => {
  return functionWrapper(async () => {
    const { query, filters } = props;
    // Build Elasticsearch query
    const esQuery = buildSearchQuery(query, filters);
    const results = await model.searchConsultants(esQuery);
    return { results };
  });
};

export const getRecommendations = async (
  userID: string,
  props: getRecommendationsRequestType['query'],
): Promise<getRecommendationsResponseType> => {
  return functionWrapper(async () => {
    const recommendations = await model.getRecommendationsForUser(userID, props);
    return { recommendations };
  });
};

// Placeholder function to build Elasticsearch query
function buildSearchQuery(query: string, filters: any): any {
  // Implement query building logic here
  return {
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query,
              fields: ['name^2', 'topics.name', 'description'],
            },
          },
        ],
        filter: buildFilters(filters),
      },
    },
  };
}

function buildFilters(filters: any): any[] {
  const filterArray = [];
  if (filters.topic) {
    filterArray.push({ term: { 'topics.name': filters.topic } });
  }
  if (filters.rating) {
    filterArray.push({ range: { rating: { gte: filters.rating } } });
  }
  if (filters.hourlyRate) {
    filterArray.push({ range: { hourlyRate: { lte: filters.hourlyRate } } });
  }
  if (filters.availableNow) {
    filterArray.push({ term: { availableNow: true } });
  }
  return filterArray;
}
