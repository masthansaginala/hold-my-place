const { Booking, Event } = require('../models');
const logger = require('../helpers/logger');
const { sendBookingConfirmationEmail, sendBookingCancelConfirmationEmail } = require('../helpers/mailservice');

async function bookEventController(data) {
  try {
    const { user_id, event_id, organizer_id, booking_ticket_count, booking_price } = data;

    // Fetch the event details
    const event = await Event.findByPk(event_id);
    if (!event) throw new Error('Event not found.');

    if (event.event_seats_left < booking_ticket_count) {
      throw new Error('Not enough seats available for the event.');
    }

    // Update event seats left and status
    event.event_seats_left -= booking_ticket_count;
    if (event.event_seats_left === 0) {
      event.event_status = 'FILLED';
    }
    await event.save();

    // Create booking
    const newBooking = await Booking.create({
      user_id,
      event_id,
      organizer_id,
      booking_ticket_count,
      booking_price,
      booking_status: 'CONFIRMED',
    });

    // Send confirmation email
    await sendBookingConfirmationEmail({
      email: data.user_email,
      bookingDetails: {
        booking_id: newBooking.booking_id,
        booking_ticket_count: newBooking.booking_ticket_count,
        booking_price: newBooking.booking_price,
        booking_status: newBooking.booking_status,
        event_name: event.event_name,
        event_date: event.event_date,
      },
    });

    logger.info(`Booking created successfully: ${newBooking.booking_id}`);
    return { message: 'Booking created successfully.', booking: newBooking };
  } catch (error) {
    logger.error(`Error booking event: ${error.message}`);
    throw error;
  }
}

async function deleteBookingController(bookingId) {
    try {
      // Fetch the booking details
      const booking = await Booking.findByPk(bookingId);
      if (!booking) throw new Error('Booking not found.');
  
      // Fetch the associated event
      const event = await Event.findByPk(booking.event_id);
      if (!event) throw new Error('Associated event not found.');
  
      // Update booking status
      booking.booking_status = 'CANCELLED';
      // booking.deleted_at = new Date();
      await booking.save();
  
      // Update event seats and status
      event.event_seats_left += booking.booking_ticket_count;
      if (event.event_seats_left > 0 && event.event_status === 'FILLED') {
        event.event_status = 'AVAILABLE';
      }
      await event.save();
  
      // Send cancellation email
      await sendBookingCancelConfirmationEmail({
        email: booking.user_email,
        bookingDetails: {
          booking_id: booking.booking_id,
          booking_ticket_count: booking.booking_ticket_count,
          booking_price: booking.booking_price,
          booking_status: booking.booking_status,
          event_name: event.event_name,
          event_date: event.event_date,
        },
      });
  
      logger.info(`Booking cancelled successfully: ${bookingId}`);
      return { message: 'Booking cancelled successfully.' };
    } catch (error) {
      logger.error(`Error cancelling booking: ${error.message}`);
      throw error;
    }
}

async function getBookingsController(query) {
    try {
      const { offset = 0, limit = 10, ...filters } = query;
      const whereConditions = { deleted_at: null }; // Exclude soft-deleted records
  
      Object.keys(filters).forEach((key) => {
        whereConditions[key] = filters[key];
      });
  
      const bookings = await Booking.findAndCountAll({
        where: whereConditions,
        offset: parseInt(offset, 10),
        limit: parseInt(limit, 10),
        include: ['event', 'user', 'organizer'], // Include related models if required
      });
  
      return { total: bookings.count, bookings: bookings.rows };
    } catch (error) {
      throw new Error(`Error fetching bookings: ${error.message}`);
    }
}

module.exports = { bookEventController, deleteBookingController, getBookingsController };
