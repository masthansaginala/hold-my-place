const { Booking, Event, User } = require('../models');
const Joi = require('joi');
const logger = require('../helpers/logger');
const { sendBookingEmail } = require('../helpers/mailservice');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// Validation schema
const updateBookingCheckinSchema = Joi.object({
  booking_id: Joi.number().integer().required(),
  booking_checkin: Joi.string().required(),
});

const updateBookingCertificateSchema = Joi.object({
  booking_id: Joi.number().integer().required(),
  booking_event_certificate_image_url: Joi.string().uri().required(),
});

async function bookEventController(data) {
  try {
    const { user_id, event_id, organizer_id, booking_ticket_count, booking_price, booking_event_date } = data;

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
      booking_event_date,
      
    });

    const subject = 'Booking Confirmation - HoldMyPlace';
    const message = 'Your booking has been successfully confirmed. Here are the details of your booking:';
    const highlightColor = '#4caf50'; // Green for confirmation
    const bookingDetails= {
      booking_id: newBooking.booking_id,
      booking_ticket_count: newBooking.booking_ticket_count,
      booking_price: newBooking.booking_price,
      booking_status: newBooking.booking_status,
      event_name: event.event_name,
      event_date: booking_event_date,
      event_time: event.event_days_type == 'single_day' ? event.event_time : event.event_timings
    };
    const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/967c1c90-7087-474e-a329-68c9af627f91-booking.png';

    const user = await User.findOne({ where: { user_id: user_id } });
    if (!user) {
      throw new Error('User not found.');
    }

    await sendBookingEmail({ email: user.user_email, subject, bookingDetails, message, highlightColor, imageUrl });

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

      const subject = 'Booking Cancellation Confirmation - HoldMyPlace';
      const message = 'Your booking has been successfully cancelled. Here are the details of your cancelled booking:';
      const highlightColor = '#d32f2f'; // Red for cancellation
      const bookingDetails = {
        booking_id: booking.booking_id,
        booking_ticket_count: booking.booking_ticket_count,
        booking_price: booking.booking_price,
        booking_status: booking.booking_status,
        event_name: event.event_name,
        event_date: event.event_date,
        event_time: event.event_days_type == 'single_day' ? event.event_time : event.event_timings
      };

      const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/6eefe3da-3476-499c-8253-a560a5aa7f97-cancel.png';



      const user = await User.findOne({ where: { user_id: booking.user_id } });
      if (!user) {
        throw new Error('User not found.');
      }
  

      await sendBookingEmail({ email: user.user_email, subject, bookingDetails, message, highlightColor, imageUrl });
      
      logger.info(`Booking cancelled successfully: ${bookingId}`);
      return { message: 'Booking cancelled successfully.' };
    } catch (error) {
      logger.error(`Error cancelling booking: ${error.message}`);
      throw error;
    }
}

async function getBookingsController(query) {
  try {
    const filters = query;
    const whereConditions = { deleted_at: null }; // Exclude soft-deleted records

    // Apply filters only if provided and not null/undefined
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== null) {
        whereConditions[key] = filters[key];
      }
    });

    // Fetch bookings with filters and pagination
    const bookings = await Booking.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: Event,
          as: 'event',
          attributes: [
            'event_name',
            'event_type',
            'event_category',
          ],
        },
      ],
    });

    // Return the result
    return {
      total: bookings.count,
      bookings: bookings.rows,
    };
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

async function downloadBookingsCSVController(req, res) {
  try {
    const { organizer_id, event_id } = req.query;
  
    // Validate mandatory parameters
    if (!organizer_id || !event_id ) {
      return res.status(400).json({
        error: 'Missing required parameters: organizer_id, event_id',
      });
    }
  
    // Fetch event details to get event name
    const event = await Event.findOne({ where: { event_id, organizer_id } });
    if (!event) {
      return res.status(404).json({ error: 'Event not found for the given organizer.' });
    }
  
    // Fetch bookings for the given filters
    const bookings = await Booking.findAll({
      where: {
        organizer_id,
        event_id,
        deleted_at: null, // Ensure soft-deleted records are excluded
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: [
            'user_first_name',
            'user_last_name',
            'user_email',
            'user_phone_number',
            'user_gender',
            'user_city',
          ],
        },
      ],
      order: [['booking_event_date', 'DESC']],
    });
  
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for the provided parameters.' });
    }
  
    // Generate the CSV filename
    const csvFileName = `${event.event_name}_${moment().format('YYYYMMDD')}.csv`;
  
    // Define the path for the downloads directory
    const downloadsDir = path.join(__dirname, '../../downloads');
    const csvFilePath = path.join(downloadsDir, csvFileName);
  
    // Ensure the downloads directory exists
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
  
    // Define the CSV header and data structure
    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'booking_id', title: 'Booking ID' },
        { id: 'user_first_name', title: 'First Name' },
        { id: 'user_last_name', title: 'Last Name' },
        { id: 'user_email', title: 'Email' },
        { id: 'user_phone_number', title: 'Phone Number' },
        { id: 'user_gender', title: 'Gender' },
        { id: 'user_city', title: 'City' },
        { id: 'booking_ticket_count', title: 'Tickets Booked' },
        { id: 'booking_price', title: 'Total Price' },
        { id: 'booking_status', title: 'Status' },
        { id: 'booking_event_date', title: 'Event Date' },
        { id: 'booking_checkin', title: 'Check In' },
      ],
    });
  
    // Prepare the data for the CSV file
    const csvData = bookings.map((booking) => ({
      booking_id: booking.booking_id,
      user_first_name: booking.user.user_first_name,
      user_last_name: booking.user.user_last_name,
      user_email: booking.user.user_email,
      user_phone_number: booking.user.user_phone_number,
      user_gender: booking.user.user_gender,
      user_city: booking.user.user_city,
      booking_ticket_count: booking.booking_ticket_count,
      booking_price: booking.booking_price,
      booking_status: booking.booking_status,
      booking_event_date: booking.booking_event_date,
      booking_checkin: booking.booking_checkin,
    }));
  
    // Write data to CSV
    await csvWriter.writeRecords(csvData);
  
    // Send the file for download
    res.download(csvFilePath, csvFileName, (err) => {
      if (err) {
        console.error('Error downloading file:', err.message);
        res.status(500).json({ error: 'Error downloading file.' });
      }
    });
  } catch (error) {
    console.error('Error in downloadBookingsCSV:', error.message);
    res.status(500).json({ error: 'Failed to generate CSV file.' });
  }

}

async function updateBookingCheckinController(req, res) {
  try {
    // Validate request body
    const { error } = updateBookingCheckinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { booking_id, booking_checkin } = req.body;

    // Find booking by ID
    const booking = await Booking.findOne({ where: { booking_id, deleted_at: null } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    // Update booking check-in status
    booking.booking_checkin = booking_checkin;
    await booking.save();

    res.status(200).json({ message: 'Booking check-in status updated successfully.' });
  } catch (error) {
    console.error('Error updating booking check-in status:', error.message);
    res.status(500).json({ error: 'Failed to update booking check-in status.' });
  }
}

async function updateBookingCertificateController(req, res) {
  try {
    // Validate request body
    const { error } = updateBookingCertificateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { booking_id, booking_event_certificate_image_url } = req.body;

    // Find booking by ID
    const booking = await Booking.findOne({ where: { booking_id, deleted_at: null } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    // Update booking event certificate image URL
    booking.booking_event_certificate_image_url = booking_event_certificate_image_url;
    await booking.save();

    res.status(200).json({ message: 'Booking event certificate image URL updated successfully.' });
  } catch (error) {
    console.error('Error updating booking event certificate image URL:', error.message);
    res.status(500).json({ error: 'Failed to update booking event certificate image URL.' });
  }
}

module.exports = { bookEventController, deleteBookingController, getBookingsController, downloadBookingsCSVController, updateBookingCheckinController, updateBookingCertificateController};
