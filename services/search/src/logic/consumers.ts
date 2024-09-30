// consumers.ts
import {
  ConsultantOnboardedEventType,
  ConsultantProfileUpdatedEventType,
  TopicAddedEventType,
  TopicUpdatedEventType,
  TopicRemovedEventType,
  AvailabilityUpdatedEventType,
  AvailableNowStatusChangedEventType,
  RatingUpdatedEventType,
} from 'events-tomeroko3';

import * as model from './dal';

// Handle Consultant Onboarded Event
export const handleConsultantOnboardedEvent = async (event: ConsultantOnboardedEventType['data']) => {
  const consultantDocument = {
    ID: event.ID,
    name: `${event.firstName} ${event.lastName}`,
    description: event.aboutMe,
    topics: [],
    rating: 0,
    hourlyRate: 0,
    availableNow: false,
  };
  await model.indexConsultant(consultantDocument);
};

// Handle Consultant Profile Updated Event
export const handleConsultantProfileUpdatedEvent = async (
  event: ConsultantProfileUpdatedEventType['data'],
) => {
  const consultantDocument = {
    ID: event.ID,
    name: `${event.firstName} ${event.lastName}`,
    description: event.aboutMe,
    // Other fields remain unchanged
  };
  await model.updateConsultant(consultantDocument);
};

// Handle Topic Added Event
export const handleTopicAddedEvent = async (event: TopicAddedEventType['data']) => {
  const topicDocument = {
    ID: event.ID,
    consultantID: event.consultantID,
    name: event.name,
    description: event.description,
  };
  await model.indexTopic(topicDocument);

  // Update consultant's topics
  const consultant = await model.getConsultantByID(event.consultantID);
  if (consultant) {
    consultant.topics.push({
      ID: event.ID,
      name: event.name,
      description: event.description,
    });
    await model.updateConsultant(consultant);
  }
};

// Handle Topic Updated Event
export const handleTopicUpdatedEvent = async (event: TopicUpdatedEventType['data']) => {
  const topicDocument = {
    ID: event.ID,
    consultantID: event.consultantID,
    name: event.name,
    description: event.description,
  };
  await model.updateTopic(topicDocument);

  // Update consultant's topics
  const consultant = await model.getConsultantByID(event.consultantID);
  if (consultant) {
    const topicIndex = consultant.topics.findIndex((t) => t.ID === event.ID);
    if (topicIndex !== -1) {
      consultant.topics[topicIndex] = {
        ID: event.ID,
        name: event.name,
        description: event.description,
      };
      await model.updateConsultant(consultant);
    }
  }
};

// Handle Topic Removed Event
export const handleTopicRemovedEvent = async (event: TopicRemovedEventType['data']) => {
  await model.deleteTopic(event.topicID);

  // Update consultant's topics
  const consultant = await model.getConsultantByID(event.consultantID);
  if (consultant) {
    consultant.topics = consultant.topics.filter((t) => t.ID !== event.topicID);
    await model.updateConsultant(consultant);
  }
};

// Handle Availability Updated Event
export const handleAvailabilityUpdatedEvent = async (event: AvailabilityUpdatedEventType['data']) => {
  // Update consultant's availability status
  const consultant = await model.getConsultantByID(event.consultantID);
  if (consultant) {
    consultant.availableNow = event.availableNow;
    await model.updateConsultant(consultant);
  }
};

// Handle Available Now Status Changed Event
export const handleAvailableNowStatusChangedEvent = async (
  event: AvailableNowStatusChangedEventType['data'],
) => {
  const consultant = await model.getConsultantByID(event.consultantID);
  if (consultant) {
    consultant.availableNow = event.availableNow;
    await model.updateConsultant(consultant);
  }
};

// Handle Rating Updated Event
export const handleRatingUpdatedEvent = async (event: RatingUpdatedEventType['data']) => {
  const consultant = await model.getConsultantByID(event.consultantID);
  if (consultant) {
    consultant.rating = event.newRating;
    await model.updateConsultant(consultant);
  }
};

// Helper function to get consultant by ID from Elasticsearch
import { consultantIndex } from '../configs/elasticsearch/initialization';

async function getConsultantByID(consultantID: string) {
  try {
    const result = await consultantIndex.get({ id: consultantID });
    return result.body._source;
  } catch (error) {
    return null;
  }
}
