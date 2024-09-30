// dal.ts
import { functionWrapper } from 'common-lib-tomeroko3';

import {
  ConsultantDocument,
  TopicDocument,
  consultantIndex,
  topicIndex,
} from '../configs/elasticsearch/initialization';

export const indexConsultant = async (consultant: ConsultantDocument) => {
  return functionWrapper(async () => {
    await consultantIndex.index({
      id: consultant.ID,
      body: consultant,
    });
  });
};

export const updateConsultant = async (consultant: ConsultantDocument) => {
  return functionWrapper(async () => {
    await consultantIndex.update({
      id: consultant.ID,
      body: { doc: consultant },
    });
  });
};

export const deleteConsultant = async (consultantID: string) => {
  return functionWrapper(async () => {
    await consultantIndex.delete({
      id: consultantID,
    });
  });
};

export const indexTopic = async (topic: TopicDocument) => {
  return functionWrapper(async () => {
    await topicIndex.index({
      id: topic.ID,
      body: topic,
    });
  });
};

export const updateTopic = async (topic: TopicDocument) => {
  return functionWrapper(async () => {
    await topicIndex.update({
      id: topic.ID,
      body: { doc: topic },
    });
  });
};

export const deleteTopic = async (topicID: string) => {
  return functionWrapper(async () => {
    await topicIndex.delete({
      id: topicID,
    });
  });
};

export const searchConsultants = async (query: any) => {
  return functionWrapper(async () => {
    const results = await consultantIndex.search({ body: query });
    return results.hits.hits.map((hit: any) => hit._source);
  });
};

export const getRecommendationsForUser = async (userID: string, params: any) => {
  return functionWrapper(async () => {
    // Implement personalized recommendation logic here
    const recommendations = []; // Placeholder
    return recommendations;
  });
};

export const getConsultantByID = async (consultantID: string) => {
  return functionWrapper(async () => {
    try {
      const result = await consultantIndex.get({ id: consultantID });
      return result.body._source as ConsultantDocument;
    } catch (error) {
      return null;
    }
  });
};
