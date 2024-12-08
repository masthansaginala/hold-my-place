const express = require('express');
const Joi = require('joi');
const { registerUserController } = require('../controllers/user');

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

// Route handler
router.post('/register', async (req, res, next) => {
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return registerUserController(req, res, next);
});

module.exports = router;
