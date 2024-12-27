const Joi = require('joi');
const express = require('express');
const { createVendorBusinessController, getVendorBusinessesController, updateVendorBusinessStatusController } = require('../controllers/vendor_business');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');

const createVendorBusinessSchema = Joi.object({
  vendor_id: Joi.number().required(),
  vendor_business_name: Joi.string().required(),
  vendor_business_date_of_establishment: Joi.date().optional(),
  vendor_business_license_number: Joi.string().optional(),
  vendor_business_proof_type: Joi.string().optional(),
  vendor_business_proof_image_url: Joi.string().uri().optional(),
  vendor_business_image_url: Joi.string().uri().optional(),
  vendor_business_email: Joi.string().email().required(),
  vendor_business_primary_phone_number: Joi.string().required(),
  vendor_business_secondary_phone_number: Joi.string().optional(),
  vendor_business_address_line_one: Joi.string().optional(),
  vendor_business_address_line_two: Joi.string().optional(),
  vendor_business_city: Joi.string().optional(),
  vendor_business_state: Joi.string().optional(),
  vendor_business_country: Joi.string().optional(),
  vendor_business_zipcode: Joi.string().optional(),
  vendor_business_service_category: Joi.string().optional(),
  vendor_business_description: Joi.string().optional(),
  vendor_business_status: Joi.string().required(),
  vendor_business_admin_remarks: Joi.string().optional()
});

const updateVendorBusinessStatusSchema = Joi.object({
  vendor_business_status: Joi.string().required(),
  vendor_business_admin_remarks: Joi.string().optional()
});

router.post('/register', async (req, res) => {
  try {
    // Validate request body
    const { error } = createVendorBusinessSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Call controller
    const result = await createVendorBusinessController(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const result = await getVendorBusinessesController(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update-status/:id', async (req, res) => {
  try {

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access forbidden: Admins only.' });
    }

    // Validate request body
    const { error } = updateVendorBusinessStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await updateVendorBusinessStatusController(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
