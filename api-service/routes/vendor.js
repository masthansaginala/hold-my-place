const express = require('express');
const Joi = require('joi');
const { registerVendorController, getVendorsController, updateVendorStatusController  } = require('../controllers/vendor');

const router = express.Router();

const registerVendorSchema = Joi.object({
    vendor_first_name: Joi.string().required(),
    vendor_last_name: Joi.string().required(),
    vendor_date_of_birth: Joi.date().required(),
    vendor_gender: Joi.string().required(),
    vendor_email: Joi.string().email().required(),
    vendor_primary_phone_number: Joi.string().required(),
    vendor_address_line_one: Joi.string().required(),
    vendor_address_line_two: Joi.string().allow(null, '').optional(),
    vendor_city: Joi.string().required(),
    vendor_state: Joi.string().required(),
    vendor_country: Joi.string().required(),
    vendor_zipcode: Joi.string().required(),
    vendor_role: Joi.string().required(),
    vendor_password: Joi.string().min(8).required(),
    vendor_status: Joi.string().required(),
    vendor_identification_number_type_one: Joi.string().required(),
    vendor_identification_number_one: Joi.string().required(),
    vendor_identification_proof_image_url_one: Joi.string().uri().required(),
    vendor_identification_number_type_two: Joi.string().optional(),
    vendor_identification_number_two: Joi.string().optional(),
    vendor_identification_proof_image_url_two: Joi.string().uri().optional()
});

const updateVendorStatusSchema = Joi.object({
  vendor_status: Joi.string().required(),
  vendor_admin_remarks: Joi.string().optional()
});

router.post('/register', async (req, res) => {
  try {
    // Validate request body
    const { error } = registerVendorSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Call controller
    const result = await registerVendorController(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const result = await getVendorsController(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Validate request body
    const { error } = updateVendorStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await updateVendorStatusController(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
