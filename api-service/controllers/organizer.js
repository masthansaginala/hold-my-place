const { Organizer } = require('../models');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const logger = require('../helpers/logger');
const { sendOrganizerWelcomeEmail } = require('../helpers/mailservice');

async function registerOrganizerController(data) {
  try {
    // Check if the email already exists
    const organizerExists = await Organizer.findOne({ where: { organizer_email: data.organizer_email } });
    if (organizerExists) {
      logger.error(`Registration failed: Email ${data.organizer_email} already exists.`);
      throw new Error('Email already registered.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.organizer_password, 10);

    // Generate a 6-digit PIN
    const organizerPin = crypto.randomInt(100000, 999999);

    // Create the organizer
    const newOrganizer = await Organizer.create({
      organizer_first_name: data.organizer_first_name,
      organizer_last_name: data.organizer_last_name,
      organizer_date_of_birth: data.organizer_date_of_birth,
      organizer_gender: data.organizer_gender,
      organizer_email: data.organizer_email,
      organizer_primary_phone_number: data.organizer_primary_phone_number,
      organizer_secondary_phone_number: data.organizer_secondary_phone_number,
      organizer_address_line_one: data.organizer_address_line_one,
      organizer_address_line_two: data.organizer_address_line_two,
      organizer_city: data.organizer_city,
      organizer_state: data.organizer_state,
      organizer_country: data.organizer_country,
      organizer_zipcode: data.organizer_zipcode,
      organizer_role: data.organizer_role,
      organizer_password: hashedPassword,
      organizer_pin: organizerPin,
      organizer_status: data.organizer_status,
      organizer_identification_number_type_one: data.organizer_identification_number_type_one,
      organizer_identification_number_one: data.organizer_identification_number_one,
      organizer_identification_proof_image_url_one: data.organizer_identification_proof_image_url_one,
      organizer_identification_number_type_two: data.organizer_identification_number_type_two,
      organizer_identification_number_two: data.organizer_identification_number_two,
      organizer_identification_proof_image_url_two: data.organizer_identification_proof_image_url_two,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Send welcome email
    await sendOrganizerWelcomeEmail(data.organizer_email, organizerPin);

    logger.info(`Organizer registered successfully: ${data.organizer_email}`);
    return { message: 'Organizer registered successfully', organizer: { email: newOrganizer.organizer_email } };
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`);
    throw error;
  }
}

module.exports = { registerOrganizerController };
