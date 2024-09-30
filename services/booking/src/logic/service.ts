/**
 * 
 Business Logic Explanation:

createBooking:
Validates that the availability block exists and is not full.
Creates a booking with status 'pending'.
Publishes a BOOKING_REQUESTED event to notify the consultant.

processBookingResponse:
Ensures that only the correct consultant can process the booking.
Checks that the booking status is 'pending'.
Updates the booking status based on the consultant's response.
Publishes appropriate events (BOOKING_APPROVED, BOOKING_CREATED, or BOOKING_REJECTED).

rescheduleBooking:
Allows either the student or the consultant to reschedule an 'approved' booking.
Validates the new availability block.
Updates the booking and publishes a BOOKING_RESCHEDULED event.

cancelBooking:
Allows either party to cancel a 'pending' or 'approved' booking.
Updates the booking status to 'cancelled'.
Publishes a BOOKING_CANCELLED event.
 * 
 * */

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

    // Check if the availability block exists and is available
    const availabilityBlock = await model.getAvailabilityBlockByID(availabilityBlockID);
    if (!availabilityBlock || availabilityBlock.status === 'full') {
      throw new AppError(appErrorCodes.BLOCK_NOT_AVAILABLE, { availabilityBlockID });
    }

    // Create the booking with status 'pending'
    const booking = {
      studentID,
      consultantID,
      availabilityBlockID,
      status: 'pending' as const,
      details,
      createdAt: new Date().toISOString(),
    };
    const bookingID = await model.createBooking(booking);

    // Publish BOOKING_REQUESTED event to notify consultant
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
    if (booking.status !== 'pending') {
      throw new AppError(appErrorCodes.INVALID_BOOKING_STATUS, { bookingID, status: booking.status });
    }

    if (approved) {
      // Update booking status to 'approved'
      booking.status = 'approved';
      await model.updateBookingByID(bookingID, { status: 'approved' });

      // Publish BOOKING_APPROVED and BOOKING_CREATED events
      bookingApprovedPublisher({ bookingID, consultantID, studentID: booking.studentID });
      bookingCreatedPublisher({ bookingID, ...booking });
    } else {
      // Update booking status to 'rejected'
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
    if (booking.status !== 'approved') {
      throw new AppError(appErrorCodes.INVALID_BOOKING_STATUS, { bookingID, status: booking.status });
    }

    // Check new availability
    const newAvailabilityBlock = await model.getAvailabilityBlockByID(newAvailabilityBlockID);
    if (!newAvailabilityBlock || newAvailabilityBlock.status === 'full') {
      throw new AppError(appErrorCodes.BLOCK_NOT_AVAILABLE, { newAvailabilityBlockID });
    }

    // Update the booking with the new availability block
    booking.availabilityBlockID = newAvailabilityBlockID;
    booking.status = 'rescheduled';
    await model.updateBookingByID(bookingID, {
      availabilityBlockID: newAvailabilityBlockID,
      status: 'rescheduled',
    });

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
    if (!['pending', 'approved'].includes(booking.status)) {
      throw new AppError(appErrorCodes.INVALID_BOOKING_STATUS, { bookingID, status: booking.status });
    }

    // Update booking status to 'cancelled'
    booking.status = 'cancelled';
    await model.updateBookingByID(bookingID, { status: 'cancelled' });

    // Publish BOOKING_CANCELLED event
    bookingCancelledPublisher({ bookingID, ...booking });

    return {};
  });
};
