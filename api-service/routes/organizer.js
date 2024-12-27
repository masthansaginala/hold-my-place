const express = require('express');
const Joi = require('joi');
const { 
  registerOrganizerController,
  organizerLoginController,
  recoverOrganizerPasswordController,
  recoverOrganizerPinController,
  updateOrganizerProfileController,
  updateOrganizerStatusController, 
  getOrganizersController
} = require('../controllers/organizer');
const validateToken = require('../middlewares/validateToken');

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

const updateOrganizerStatusSchema = Joi.object({
  organizer_status: Joi.string().required(),
  organizer_admin_remarks: Joi.string().optional()
});

// Validation schema for organizer login
const organizerLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  pin: Joi.string().required(),
  role: Joi.string().valid('ORGANIZER').required(),
});

// Validation Schemas
const recoverOrganizerPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  pin: Joi.string().required(),
  new_password: Joi.string().min(8).required(),
  role: Joi.string().valid('ORGANIZER').required(),
});

const recoverOrganizerPinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('ORGANIZER').required(),
});

const updateOrganizerProfileSchema = Joi.object({
  organizer_first_name: Joi.string().optional(),
  organizer_last_name: Joi.string().optional(),
  organizer_date_of_birth: Joi.date().optional(),
  organizer_gender: Joi.string().optional(),
  organizer_primary_phone_number: Joi.string().optional(),
  organizer_secondary_phone_number: Joi.string().optional(),
  organizer_address_line_one: Joi.string().optional(),
  organizer_address_line_two: Joi.string().optional(),
  organizer_city: Joi.string().optional(),
  organizer_state: Joi.string().optional(),
  organizer_country: Joi.string().optional(),
  organizer_zipcode: Joi.string().optional(),
  organizer_password: Joi.string().optional(),
});

// Handles organizer registration route
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

router.put('/update-status/:id', validateToken, async (req, res) => {
  try {
    // Validate request body

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access forbidden: Admins only.' });
    }

    const { error } = updateOrganizerStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await updateOrganizerStatusController(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const result = await getOrganizersController(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Organizer login
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { error } = organizerLoginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Process login
    const result = await organizerLoginController(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Recover Password
router.put('/recover-password', async (req, res) => {
  try {
    const { error } = recoverOrganizerPasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await recoverOrganizerPasswordController(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Recover Pin
router.put('/recover-pin', async (req, res) => {
  try {
    const { error } = recoverOrganizerPinSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await recoverOrganizerPinController(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Update Organizer Profile
router.put('/update-profile/:id', validateToken, async (req, res) => {
  try {

    if (req.user.role !== 'ORGANIZER') {
      return res.status(403).json({ error: 'Access forbidden: Organizers only.' });
    }
    
    const { error } = updateOrganizerProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await updateOrganizerProfileController(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
