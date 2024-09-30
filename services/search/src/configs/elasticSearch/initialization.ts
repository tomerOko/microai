// configs/elasticsearch/initialization.ts
import { Client } from '@elastic/elasticsearch';
import { functionWrapper } from 'common-lib-tomeroko3';
import { z } from 'zod';
import { searchIndexValidations } from 'events-tomeroko3';

const { consultantDocument, topicDocument } = searchIndexValidations;

export type ConsultantDocument = z.infer<typeof consultantDocument>;
export type TopicDocument = z.infer<typeof topicDocument>;

export const esClient = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' });

export const consultantIndex = esClient.helpers.createIndex({
  index: 'consultants',
  mappings: {
    properties: {
      // Define mappings according to consultantDocument schema
    },
  },
});

export const topicIndex = esClient.helpers.createIndex({
  index: 'topics',
  mappings: {
    properties: {
      // Define mappings according to topicDocument schema
    },
  },
});

export const initializeIndices = async () => {
  return functionWrapper(async () => {
    // Initialize indices if they don't exist
    const indices = await esClient.cat.indices({ format: 'json' });
    const indexNames = indices.body.map((index: any) => index.index);
    if (!indexNames.includes('consultants')) {
      await esClient.indices.create({ index: 'consultants' });
    }
    if (!indexNames.includes('topics')) {
      await esClient.indices.create({ index: 'topics' });
    }
  });
};
