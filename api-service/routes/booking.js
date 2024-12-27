const express = require('express');
const Joi = require('joi');
const {
  bookEventController,
  deleteBookingController,
  getBookingsController,
  downloadBookingsCSVController,
  updateBookingCheckinController,
  updateBookingCertificateController 
} = require('../controllers/booking');

const router = express.Router();

const createBookingSchema = Joi.object({
  user_id: Joi.number().required(),
  event_id: Joi.number().required(),
  organizer_id: Joi.number().required(),
  booking_ticket_count: Joi.number().min(1).required(),
  booking_price: Joi.number().required(),
  user_email: Joi.string().email().required(),
  booking_event_date: Joi.date().required(),
});

router.post('/book', async (req, res) => {
  try {
    const { error } = createBookingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await bookEventController(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/cancel/:id', async (req, res) => {
  try {
    const result = await deleteBookingController(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const result = await getBookingsController(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/download-bookings', downloadBookingsCSVController);

router.put('/update-checkin', updateBookingCheckinController);

router.put('/update-certificate-url', updateBookingCertificateController);

module.exports = router;
