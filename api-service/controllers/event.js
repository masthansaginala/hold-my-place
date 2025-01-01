const { Event } = require('../models');
const logger = require('../helpers/logger');

async function createEventController(data) {
  try {
    // Check for duplicate event name
    const eventExists = await Event.findOne({ where: { event_name: data.event_name } });
    if (eventExists) {
      throw new Error('Event with this name already exists.');
    }

    // Create new event
    const newEvent = await Event.create(data);
    logger.info(`Event created successfully: ${newEvent.event_name}`);
    return { message: 'Event created successfully.', event: newEvent };
  } catch (error) {
    logger.error(`Error creating event: ${error.message}`);
    throw error;
  }
}

async function updateEventController(eventId, data) {
  try {
    const event = await Event.findByPk(eventId);
    if (!event) throw new Error('Event not found.');

    // Prevent updating restricted fields
    if (data.event_name || data.event_category || data.event_type || data.event_days_type) {
      throw new Error('Cannot update event_name, event_category, or event_type or event_days_type.');
    }

    await event.update(data);
    logger.info(`Event updated successfully: ${eventId}`);
    return { message: 'Event updated successfully.' };
  } catch (error) {
    logger.error(`Error updating event: ${error.message}`);
    throw error;
  }
}

async function deleteEventController(eventId) {
  try {
    const event = await Event.findByPk(eventId);
    if (!event) throw new Error('Event not found.');

    event.event_status = 'INACTIVE';
    event.deleted_at = new Date();
    await event.save();

    logger.info(`Event soft-deleted successfully: ${eventId}`);
    return { message: 'Event deleted successfully.' };
  } catch (error) {
    logger.error(`Error deleting event: ${error.message}`);
    throw error;
  }
}

async function getEventsController(query) {
  try {
    const filters = query;
    const whereConditions = { deleted_at: null };

    Object.keys(filters).forEach((key) => {
      whereConditions[key] = filters[key];
    });

    const events = await Event.findAndCountAll({
      where: whereConditions
    });

    return { total: events.count, events: events.rows };
  } catch (error) {
    throw new Error(`Error fetching events: ${error.message}`);
  }
}

module.exports = {
  createEventController,
  updateEventController,
  deleteEventController,
  getEventsController,
};
