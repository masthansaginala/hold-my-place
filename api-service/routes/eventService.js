const express = require('express');
const {
    addEventServiceController,
    getEventServicesController,
    updateOrganizerEventServiceConntroller,
    updateVendorEventServiceConntroller
} = require('../controllers/eventService');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/add',validateToken, addEventServiceController);

router.get('/list', getEventServicesController);

router.put('/orgainzer-update/:id', validateToken, updateOrganizerEventServiceConntroller);
router.put('/vendor-update/:id', validateToken, updateVendorEventServiceConntroller);

module.exports = router;
