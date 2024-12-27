const express = require('express');
const {
    addEventServiceController,
    getEventServicesController,
    updateOrganizerEventServiceConntroller,
    updateVendorEventServiceConntroller
} = require('../controllers/eventService');

const router = express.Router();

router.post('/add', addEventServiceController);

router.get('/list', getEventServicesController);

router.put('/orgainzer-update/:id', updateOrganizerEventServiceConntroller);
router.put('/vendor-update/:id', updateVendorEventServiceConntroller);

module.exports = router;
