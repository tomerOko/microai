// service.ts
import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  createBookingRequestType,
  createBookingResponseType,
  processBookingResponseRequestType,
  processBookingResponseResponseType,
  rescheduleBookingRequestType,
  rescheduleBookingResponseType,
  cancelBookingRequestType,
  cancelBookingResponseType,
} from 'events-tomeroko3';

import {
  bookingRequestedPublisher,
  bookingApprovedPublisher,
  bookingRejectedPublisher,
  bookingCreatedPublisher,
  bookingCancelledPublisher,
  bookingRescheduledPublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const createBooking = async (
  props: createBookingRequestType['body'],
): Promise<createBookingResponseType> => {
  return functionWrapper(async () => {
    const studentID = getAuthenticatedID() as string;
    const { consultantID, availabilityBlockID, details } = props;

    // Check availability
    const availabilityBlock = await model.getAvailabilityBlockByID(availabilityBlockID);
    if (!availabilityBlock || availabilityBlock.status === 'full') {
      throw new AppError(appErrorCodes.BLOCK_NOT_AVAILABLE, { availabilityBlockID });
    }

    const booking = {
      studentID,
      consultantID,
      availabilityBlockID,
      status: 'pending',
      details,
      createdAt: new Date().toISOString(),
    };
    const bookingID = await model.createBooking(booking);

    // Publish BOOKING_REQUESTED event
    bookingRequestedPublisher({ bookingID, ...booking });

    return { bookingID };
  });
};

export const processBookingResponse = async (
  props: processBookingResponseRequestType['body'],
): Promise<processBookingResponseResponseType> => {
  return functionWrapper(async () => {
    const consultantID = getAuthenticatedID() as string;
    const { bookingID, approved } = props;

    const booking = await model.getBookingByID(bookingID);
    if (!booking) {
      throw new AppError(appErrorCodes.BOOKING_NOT_FOUND, { bookingID });
    }
    if (booking.consultantID !== consultantID) {
      throw new AppError(appErrorCodes.UNAUTHORIZED_ACTION, { bookingID, consultantID });
    }

    if (approved) {
      booking.status = 'approved';
      await model.updateBookingByID(bookingID, { status: 'approved' });

      // Publish BOOKING_APPROVED and BOOKING_CREATED events
      bookingApprovedPublisher({ bookingID, consultantID, studentID: booking.studentID });
      bookingCreatedPublisher({ bookingID, ...booking });
    } else {
      booking.status = 'rejected';
      await model.updateBookingByID(bookingID, { status: 'rejected' });

      // Publish BOOKING_REJECTED event
      bookingRejectedPublisher({ bookingID, consultantID, studentID: booking.studentID });
    }

    return {};
  });
};

export const rescheduleBooking = async (
  props: rescheduleBookingRequestType['body'],
): Promise<rescheduleBookingResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { bookingID, newAvailabilityBlockID } = props;

    const booking = await model.getBookingByID(bookingID);
    if (!booking) {
      throw new AppError(appErrorCodes.BOOKING_NOT_FOUND, { bookingID });
    }
    if (booking.studentID !== userID && booking.consultantID !== userID) {
      throw new AppError(appErrorCodes.UNAUTHORIZED_ACTION, { bookingID, userID });
    }

    // Check new availability
    const newAvailabilityBlock = await model.getAvailabilityBlockByID(newAvailabilityBlockID);
    if (!newAvailabilityBlock || newAvailabilityBlock.status === 'full') {
      throw new AppError(appErrorCodes.BLOCK_NOT_AVAILABLE, { newAvailabilityBlockID });
    }

    booking.availabilityBlockID = newAvailabilityBlockID;
    booking.status = 'rescheduled';
    await model.updateBookingByID(bookingID, booking);

    // Publish BOOKING_RESCHEDULED event
    bookingRescheduledPublisher({ bookingID, ...booking });

    return {};
  });
};

export const cancelBooking = async (
  props: cancelBookingRequestType['body'],
): Promise<cancelBookingResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { bookingID } = props;

    const booking = await model.getBookingByID(bookingID);
    if (!booking) {
      throw new AppError(appErrorCodes.BOOKING_NOT_FOUND, { bookingID });
    }
    if (booking.studentID !== userID && booking.consultantID !== userID) {
      throw new AppError(appErrorCodes.UNAUTHORIZED_ACTION, { bookingID, userID });
    }

    booking.status = 'cancelled';
    await model.updateBookingByID(bookingID, { status: 'cancelled' });

    // Publish BOOKING_CANCELLED event
    bookingCancelledPublisher({ bookingID, ...booking });

    return {};
  });
};
