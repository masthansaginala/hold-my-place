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
const validateToken = require('../middlewares/validateToken');


const router = express.Router();

const createBookingSchema = Joi.object({
  user_id: Joi.number().required(),
  event_id: Joi.number().required(),
  organizer_id: Joi.number().required(),
  booking_ticket_count: Joi.number().min(1).required(),
  booking_price: Joi.number().required(),
  user_email: Joi.string().email().required(),
  booking_event_date: Joi.string().required(),
});

router.post('/book', validateToken, async(req, res) => {
  try {

    if (req.user.role !== 'USER') {
      return res.status(403).json({ error: 'Access forbidden: Users only.' });
    }

    const { error } = createBookingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await bookEventController(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/cancel/:id', validateToken, async (req, res) => {
  try {

    if (req.user.role !== 'USER') {
      return res.status(403).json({ error: 'Access forbidden: Users only.' });
    }

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

router.get('/download-bookings', validateToken, downloadBookingsCSVController);

router.put('/update-checkin',validateToken, updateBookingCheckinController);

router.put('/update-certificate-url', validateToken, updateBookingCertificateController);

module.exports = router;
