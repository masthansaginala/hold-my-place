const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const organizerRoutes = require('./organizer');
const vendorRoutes = require('./vendor');
const vendorBusinessRoutes = require('./vendor_business');
const eventRoutes = require('./event');
const serviceRoutes = require('./eventService');
const bookingRoutes = require('./booking');
const { adminLoginRoute } = require('./admin');
const { createContact, getContacts, updateContact } = require('../controllers/contact');
const imageRoutes = require('./uploadRoutes');
const { createSupport, listSupport, updateSupport } = require('../controllers/support');

router.use('/users', userRoutes);
router.use('/organizers', organizerRoutes);
router.use('/vendors', vendorRoutes);
router.use('/vendor-business', vendorBusinessRoutes);
router.use('/events', eventRoutes);
router.use('/event-service', serviceRoutes);

router.use('/booking', bookingRoutes);
router.use('/image', imageRoutes);



// Admin routes
router.post('/admin/login', adminLoginRoute);

// Support routes
router.post('/app-support/create', createSupport);
router.get('/app-support/list', listSupport);
router.put('/app-support/update/:id', updateSupport);


// Contact routes
router.post('/app-contact/create', createContact);
router.get('/app-contact/list', getContacts);
router.put('/app-contact/update/:contact_id', updateContact);

module.exports = router;
