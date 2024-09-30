// service.ts
import { functionWrapper } from 'common-lib-tomeroko3';
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

// Implementing buildSearchQuery
function buildSearchQuery(query: string, filters: any): any {
  const esQuery: any = {
    bool: {
      must: [],
      filter: [],
    },
  };

  if (query) {
    esQuery.bool.must.push({
      multi_match: {
        query,
        fields: ['name^2', 'topics.name^2', 'description', 'topics.description'],
        fuzziness: 'AUTO',
      },
    });
  } else {
    esQuery.bool.must.push({
      match_all: {},
    });
  }

  // Apply filters
  if (filters) {
    if (filters.topic) {
      esQuery.bool.filter.push({
        term: { 'topics.name.keyword': filters.topic },
      });
    }
    if (filters.rating) {
      esQuery.bool.filter.push({
        range: { rating: { gte: filters.rating } },
      });
    }
    if (filters.hourlyRate) {
      esQuery.bool.filter.push({
        range: { hourlyRate: { lte: filters.hourlyRate } },
      });
    }
    if (filters.availableNow) {
      esQuery.bool.filter.push({
        term: { availableNow: true },
      });
    }
  }

  return { query: esQuery };
}

// Implementing getRecommendationsForUser
async function getRecommendationsForUser(userID: string, params: any): Promise<any[]> {
  // Placeholder logic for personalized recommendations
  // In a real-world scenario, you'd use collaborative filtering, user behavior analysis, etc.
  // For simplicity, we'll recommend top-rated consultants
  const esQuery = {
    size: params.limit || 10,
    sort: [{ rating: { order: 'desc' } }],
    query: {
      match_all: {},
    },
  };

  const results = await model.searchConsultants(esQuery);
  return results;
}
