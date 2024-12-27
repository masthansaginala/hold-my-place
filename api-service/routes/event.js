const express = require('express');
const Joi = require('joi');
const {
  createEventController,
  updateEventController,
  deleteEventController,
  getEventsController,
} = require('../controllers/event');
const router = express.Router();

const createEventSchema = Joi.object({
  organizer_id: Joi.number().required(),
  event_name: Joi.string().required(),
  event_description: Joi.string().optional(),
  event_total_seats: Joi.number().required(),
  event_seats_left: Joi.number().required(),
  event_days_type: Joi.string().required(),
  event_date: Joi.date().optional(),
  event_start_date: Joi.date().optional(),
  event_end_date: Joi.date().optional(),
  event_timings: Joi.string().optional(),
  event_time: Joi.string().optional(),
  event_category: Joi.string().required(),
  event_type: Joi.string().required(),
  event_food: Joi.string().optional(),
  event_transportation: Joi.string().optional(),
  event_accommodation: Joi.string().optional(),
  event_ticket_price: Joi.number().optional(),
  event_delivery_language: Joi.string().optional(),
  event_age_limit: Joi.string().optional(),
  event_guests: Joi.string().optional(),
  event_discount: Joi.string().optional(),
  event_ticket_filling_status: Joi.string().optional(),
  event_status: Joi.string().required(),
  event_early_bird_offer: Joi.string().optional(),
  event_address_line_one: Joi.string().optional(),
  event_address_line_two: Joi.string().optional(),
  event_city: Joi.string().optional(),
  event_state: Joi.string().optional(),
  event_country: Joi.string().optional(),
  event_zipcode: Joi.string().optional(),
  event_image_url_one: Joi.string().optional(),
  event_image_url_two: Joi.string().optional(),
  event_image_url_three: Joi.string().optional(),
});

const updateEventSchema = Joi.object({
  event_description: Joi.string().optional(),
  event_total_seats: Joi.number().optional(),
  event_seats_left: Joi.number().optional(),
  event_date: Joi.date().optional(),
  event_start_date: Joi.date().optional(),
  event_end_date: Joi.date().optional(),
  event_timings: Joi.string().optional(),
  event_time: Joi.string().optional(),
  event_food: Joi.string().optional(),
  event_transportation: Joi.string().optional(),
  event_accommodation: Joi.string().optional(),
  event_ticket_price: Joi.number().optional(),
  event_delivery_language: Joi.string().optional(),
  event_age_limit: Joi.string().optional(),
  event_guests: Joi.string().optional(),
  event_discount: Joi.string().optional(),
  event_ticket_filling_status: Joi.string().optional(),
  event_status: Joi.string().optional(),
  event_early_bird_offer: Joi.string().optional(),
  event_address_line_one: Joi.string().optional(),
  event_address_line_two: Joi.string().optional(),
  event_city: Joi.string().optional(),
  event_state: Joi.string().optional(),
  event_country: Joi.string().optional(),
  event_zipcode: Joi.string().optional(),
  event_image_url_one: Joi.string().optional(),
  event_image_url_two: Joi.string().optional(),
  event_image_url_three: Joi.string().optional(),
});

router.post('/register', async (req, res) => {
  try {
    const { error } = createEventSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await createEventController(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/update-event/:id', async (req, res) => {
  try {
    const { error } = updateEventSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await updateEventController(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-event/:id', async (req, res) => {
  try {
    const result = await deleteEventController(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const result = await getEventsController(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
