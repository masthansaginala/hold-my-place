const express = require('express');
const Joi = require('joi');
const { registerUserController, userLoginController, recoverUserPasswordController, recoverUserPinController, updateUserProfileController } = require('../controllers/user');
const validateToken = require('../middlewares/validateToken');
const router = express.Router();

// Validation schema
const registerUserSchema = Joi.object({
  user_first_name: Joi.string().required(),
  user_last_name: Joi.string().required(),
  user_date_of_birth: Joi.date().required(),
  user_gender: Joi.string().required(),
  user_email: Joi.string().email().required(),
  user_phone_number: Joi.string().required(),
  user_address_line_one: Joi.string().required(),
  user_address_line_two: Joi.string().required(),
  user_city: Joi.string().required(),
  user_state: Joi.string().required(),
  user_country: Joi.string().required(),
  user_zipcode: Joi.string().required(),
  user_role: Joi.string().required(),
  user_password: Joi.string().min(8).required(),
  user_status: Joi.string().required(),
});

// Validation schema for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  pin: Joi.string().required(),
  role: Joi.string().valid('USER').required(),
});

// Validation Schemas
const recoverUserPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  pin: Joi.string().required(),
  new_password: Joi.string().min(8).required(),
  role: Joi.string().valid('USER').required(),
});

const recoverUserPinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('USER').required(),
});

const updateUserProfileSchema = Joi.object({
  user_first_name: Joi.string().optional(),
  user_last_name: Joi.string().optional(),
  user_date_of_birth: Joi.date().optional(),
  user_gender: Joi.string().optional(),
  user_phone_number: Joi.string().optional(),
  user_address_line_one: Joi.string().optional(),
  user_address_line_two: Joi.string().optional(),
  user_city: Joi.string().optional(),
  user_state: Joi.string().optional(),
  user_country: Joi.string().optional(),
  user_zipcode: Joi.string().optional(),
  user_password: Joi.string().optional(),
});

// Route handler
router.post('/register', async (req, res, next) => {
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return registerUserController(req, res, next);
});

// POST: User login
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Process login
    const result = await userLoginController(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Recover Password
router.put('/recover-password', async (req, res) => {
  try {
    const { error } = recoverUserPasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await recoverUserPasswordController(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Recover Pin
router.put('/recover-pin', async (req, res) => {
  try {
    const { error } = recoverUserPinSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await recoverUserPinController(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Update User Profile
router.put('/update-profile/:id', validateToken, async (req, res) => {
  try {

    if (req.user.role !== 'USER') {
      return res.status(403).json({ error: 'Access forbidden: Users only.' });
    }

    const { error } = updateUserProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await updateUserProfileController(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
