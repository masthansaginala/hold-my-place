const express = require('express');
const Joi = require('joi');
const { registerVendorController, getVendorsController, updateVendorStatusController, vendorLoginController, updateVendorProfileController, recoverVendorPasswordController, recoverVendorPinController } = require('../controllers/vendor');
const validateToken = require('../middlewares/validateToken');
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
    vendor_role: Joi.string().valid('VENDOR').required(),
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

const vendorLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  pin: Joi.string().required(),
  role: Joi.string().valid('VENDOR').required(),
});

const updateVendorProfileSchema = Joi.object({
  vendor_first_name: Joi.string().optional(),
  vendor_last_name: Joi.string().optional(),
  vendor_date_of_birth: Joi.date().optional(),
  vendor_gender: Joi.string().optional(),
  vendor_primary_phone_number: Joi.string().optional(),
  vendor_address_line_one: Joi.string().optional(),
  vendor_address_line_two: Joi.string().optional(),
  vendor_city: Joi.string().optional(),
  vendor_state: Joi.string().optional(),
  vendor_country: Joi.string().optional(),
  vendor_zipcode: Joi.string().optional(),
  vendor_password: Joi.string().optional(),
});

const recoverVendorPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  pin: Joi.string().required(),
  new_password: Joi.string().min(8).required(),
  role: Joi.string().valid('VENDOR').required(),
});

const recoverVendorPinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('VENDOR').required(),
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

router.put('/update-status/:id', validateToken, async (req, res) => {
  try {

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access forbidden: ADMIN only.' });
    }

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

// POST: Vendor login
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { error } = vendorLoginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Process login
    const result = await vendorLoginController(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Update Vendor Profile
router.put('/update-profile/:id', validateToken, async (req, res) => {
  try {

    if (req.user.role !== 'VENDOR') {
      return res.status(403).json({ error: 'Access forbidden: Vendors only.' });
    }

    const { error } = updateVendorProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await updateVendorProfileController(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Recover Password
router.put('/recover-password', async (req, res) => {
  try {
    const { error } = recoverVendorPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await recoverVendorPasswordController(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Recover Pin
router.put('/recover-pin', async (req, res) => {
  try {
    const { error } = recoverVendorPinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await recoverVendorPinController(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
