const express = require('express');
const Joi = require('joi');
const { registerOrganizerController } = require('../controllers/organizer');

const router = express.Router();

// Validation schema
const registerOrganizerSchema = Joi.object({  
  organizer_first_name: Joi.string().required(),
  organizer_last_name: Joi.string().required(),
  organizer_date_of_birth: Joi.date().required(),
  organizer_gender: Joi.string().required(),
  organizer_email: Joi.string().email().required(),
  organizer_primary_phone_number: Joi.string().required(),
  organizer_secondary_phone_number: Joi.string().required(),
  organizer_address_line_one: Joi.string().required(),
  organizer_address_line_two: Joi.string().required(),
  organizer_city: Joi.string().required(),
  organizer_state: Joi.string().required(),
  organizer_country: Joi.string().required(),
  organizer_zipcode: Joi.string().required(),
  organizer_role: Joi.string().required(),
  organizer_password: Joi.string().min(8).required(),
  organizer_status: Joi.string().required(),
  organizer_identification_number_type_one: Joi.string().required(),
  organizer_identification_number_one: Joi.string().required(),
  organizer_identification_proof_image_url_one: Joi.string().required(),
  organizer_identification_number_type_two: Joi.string().required(),
  organizer_identification_number_two: Joi.string().required(),
  organizer_identification_proof_image_url_two: Joi.string().required(),
});

/**
 * Handles organizer registration route.
 */
router.post('/register', async (req, res) => {
  try {
    // Validate request body
    const { error } = registerOrganizerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Call controller
    const result = await registerOrganizerController(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
