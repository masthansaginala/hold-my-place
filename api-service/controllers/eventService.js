const { Event_Service, Organizer, Vendor, Vendor_Business, Event } = require('../models');
const { sendEmail } = require('../helpers/mailservice');

async function addEventServiceController(req, res) {
  try {
    const { event_id, organizer_id, vendor_id, vendor_business_id, event_service_status_organizer, event_service_status_vendor } = req.body;

    // Validate required fields
    if (!event_id || !organizer_id || !vendor_id || !vendor_business_id || !event_service_status_organizer || !event_service_status_vendor) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Verify associated entities exist
    const [organizer, vendor, vendorBusiness, event] = await Promise.all([
      Organizer.findByPk(organizer_id),
      Vendor.findByPk(vendor_id),
      Vendor_Business.findByPk(vendor_business_id),
      Event.findByPk(event_id),
    ]);

    if (!organizer || !vendor || !vendorBusiness || !event) {
      return res.status(404).json({ error: 'Invalid organizer, vendor, business, or event ID.' });
    }

    // Create event service
    const eventService = await Event_Service.create({
      event_id,
      organizer_id,
      vendor_id,
      vendor_business_id,
      event_service_status_organizer,
      event_service_status_vendor
    });

    // Send email notifications
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
        <h1 style="color: #4caf50;">New Event Service Request</h1>
        <p>A new event service has been added to HoldMyPlace. You are part of this new event service. See details below:</p>
        <img src="https://holdmyplaceimages.blob.core.windows.net/holdmyimage/e7d17036-f3a8-4bcf-9e6d-944416a95f42-newservcreq.png" alt="Alert Update" style="width: 150px; height: auto; margin-top: 10px;">
        <p style="margin-top: 20px;">Thank you for being part of HoldMyPlace.</p>
      </div>
    `;

    await Promise.all([
      sendEmail(
        organizer.organizer_email,
        'New Event Service Request',
        htmlContent
      ),
      sendEmail(
        vendor.vendor_email,
        'New Event Service Request',
        htmlContent
      ),
      sendEmail(
        vendorBusiness.vendor_business_email,
        'New Event Service Request',
        htmlContent
      ),
    ]);


    return res.status(201).json({ message: 'Event service added successfully.', eventService });
  } catch (error) {
    console.error('Error adding event service:', error.message);
    res.status(500).json({ error: 'Failed to add event service.' });
  }
}

async function getEventServicesController(req, res) {
    try {
      const { offset = 0, limit = 10, ...filters } = req.query;
  
      const whereConditions = { deleted_at: null };
  
      // Apply optional filters
      Object.keys(filters).forEach((key) => {
        whereConditions[key] = filters[key];
      });
  
      const eventServices = await Event_Service.findAndCountAll({
        where: whereConditions,
        offset: parseInt(offset, 10),
        limit: parseInt(limit, 10),
        include: [
          { model: Organizer, as: 'organizer', attributes: ['organizer_email'] },
          { model: Vendor, as: 'vendor', attributes: ['vendor_email'] },
          { model: Vendor_Business, as: 'vendorBusiness', attributes: ['vendor_business_email', 'vendor_business_name', 'vendor_business_primary_phone_number', 'vendor_business_service_category'] },
        ],
      });
  
      res.status(200).json({ total: eventServices.count, eventServices: eventServices.rows });
    } catch (error) {
      console.error('Error fetching event services:', error.message);
      res.status(500).json({ error: 'Failed to fetch event services.' });
    }
}

async function updateOrganizerEventServiceConntroller(req, res) {
    try {
      const { id } = req.params;
      const {
        event_service_status_organizer,
        event_service_remarks_organizer,
      } = req.body;
  
      const eventService = await Event_Service.findByPk(id);
  
      if (!eventService) {
        return res.status(404).json({ error: 'Event service not found.' });
      }

      if (event_service_status_organizer == '')
  
      // Update the event service fields
      Object.assign(eventService, {
        event_service_status_organizer,
        event_service_remarks_organizer,
      });
  
      await eventService.save();
  
      // Fetch related email addresses
      const [organizer, vendor, vendorBusiness] = await Promise.all([
        Organizer.findByPk(eventService.organizer_id),
        Vendor.findByPk(eventService.vendor_id),
        Vendor_Business.findByPk(eventService.vendor_business_id),
      ]);
  
      // Send email notifications
      const organizerHtmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
          <h1 style="color: #4caf50;">Event Service Status Update</h1>
          <p>Organizer Update:</p>
          <p>Status: <strong>${event_service_status_organizer}</strong></p>
          <p>Remarks: <strong>${event_service_remarks_organizer}</strong></p>
          <img src="https://holdmyplaceimages.blob.core.windows.net/holdmyimage/be6e3e2c-5ef7-49af-80f6-2e96ae83ba13-servststupd.png" alt="Alert Update" style="width: 150px; height: auto; margin-top: 10px;">
          <p style="margin-top: 20px;">Thank you for using HoldMyPlace.</p>
        </div>
      `;

    await Promise.all([
      sendEmail(
        organizer.organizer_email,
        'Event Service Status Update',
        organizerHtmlContent
      ),
      sendEmail(
        vendor.vendor_email,
        'Event Service Status Update',
        organizerHtmlContent
      ),
      sendEmail(
        vendorBusiness.vendor_business_email,
        'Event Service Status Update',
        organizerHtmlContent
      ),
    ]);

  
      res.status(200).json({ message: 'Event service updated successfully.', eventService });
    } catch (error) {
      console.error('Error updating event service:', error.message);
      res.status(500).json({ error: 'Failed to update event service.' });
    }
}

async function updateVendorEventServiceConntroller(req, res) {
  try {
    const { id } = req.params;
    const {
      event_service_status_vendor,
      event_service_remarks_vendor,
    } = req.body;

    const eventService = await Event_Service.findByPk(id);

    if (!eventService) {
      return res.status(404).json({ error: 'Event service not found.' });
    }

    // Update the event service fields
    Object.assign(eventService, {
      event_service_status_vendor,
      event_service_remarks_vendor,
    });

    await eventService.save();

    // Fetch related email addresses
    const [organizer, vendor, vendorBusiness] = await Promise.all([
      Organizer.findByPk(eventService.organizer_id),
      Vendor.findByPk(eventService.vendor_id),
      Vendor_Business.findByPk(eventService.vendor_business_id),
    ]);

    // Send email notifications
    const vendorHtmlContent = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
        <h1 style="color: #4caf50;">Event Service Status Update</h1>
        <p>Vendor Status Updated:</p>
        <p>Status: <strong>${event_service_status_vendor}</strong></p>
        <p>Remarks: <strong>${event_service_remarks_vendor}</strong></p>
        <img src="https://holdmyplaceimages.blob.core.windows.net/holdmyimage/be6e3e2c-5ef7-49af-80f6-2e96ae83ba13-servststupd.png" alt="Alert Update" style="width: 150px; height: auto; margin-top: 10px;">
        <p style="margin-top: 20px;">Thank you for using HoldMyPlace.</p>
      </div>
    `;

    await Promise.all([
      sendEmail(
        organizer.organizer_email,
        'Event Service Status Update',
        vendorHtmlContent
      ),
      sendEmail(
        vendor.vendor_email,
        'Event Service Status Update',
        vendorHtmlContent
      ),
      sendEmail(
        vendorBusiness.vendor_business_email,
        'Event Service Status Update',
        vendorHtmlContent
      ),
    ]);


    res.status(200).json({ message: 'Event service updated successfully.', eventService });
  } catch (error) {
    console.error('Error updating event service:', error.message);
    res.status(500).json({ error: 'Failed to update event service.' });
  }
}

module.exports = { addEventServiceController, getEventServicesController, updateOrganizerEventServiceConntroller, updateVendorEventServiceConntroller };
