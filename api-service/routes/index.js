const express = require('express');
const userRoutes = require('./user');
const organizerRoutes = require('./organizer');
const vendorRoutes = require('./vendor');
const vendorBusinessRoutes = require('./vendor_business');
const eventRoutes = require('./event');
const bookingRoutes = require('./booking');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/organizers', organizerRoutes);
router.use('/vendors', vendorRoutes);
router.use('/vendor-business', vendorBusinessRoutes);
router.use('/events', eventRoutes);
router.use('/booking', bookingRoutes);

module.exports = router;
