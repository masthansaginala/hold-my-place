const { Organizer } = require('../models');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger');
const { sendOrganizerWelcomeEmail, sendPinUpdateEmail, sendOrganizerStatusEmail, sendOrganizerAdminAlertEmail } = require('../helpers/mailservice');


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

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

    console.log(data,'hi');

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
    await sendOrganizerWelcomeEmail(data.organizer_email);

    await sendOrganizerAdminAlertEmail({
      email: data.organizer_email,
      phone: data.organizer_primary_phone_number,
      name: `${data.organizer_first_name} ${data.organizer_last_name}`,
    });

    logger.info(`Organizer registered successfully: ${data.organizer_email}`);
    return { message: 'Organizer registered successfully', organizer: { email: newOrganizer.organizer_email } };
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`);
    throw error;
  }
}

async function getOrganizersController(query) {
  try {
    const filters = query;

    // Initialize where conditions for filters
    const whereConditions = { deleted_at: null }; // Exclude soft-deleted records

    // Add filters dynamically
    if (filters.organizer_id) whereConditions.organizer_id = filters.organizer_id;
    if (filters.organizer_email) whereConditions.organizer_email = filters.organizer_email;
    if (filters.organizer_status) whereConditions.organizer_status = filters.organizer_status;
    if (filters.organizer_first_name) whereConditions.organizer_first_name = { [Op.iLike]: `%${filters.organizer_first_name}%` };
    if (filters.organizer_last_name) whereConditions.organizer_last_name = { [Op.iLike]: `%${filters.organizer_last_name}%` };
    if (filters.organizer_city) whereConditions.organizer_city = { [Op.iLike]: `%${filters.organizer_city}%` };
    if (filters.organizer_state) whereConditions.organizer_state = { [Op.iLike]: `%${filters.organizer_state}%` };
    if (filters.organizer_country) whereConditions.organizer_country = { [Op.iLike]: `%${filters.organizer_country}%` };
    if (filters.organizer_zipcode) whereConditions.organizer_zipcode = filters.organizer_zipcode;

    // Query the database with pagination
    const organizers = await Organizer.findAndCountAll({
      where: whereConditions,
      attributes: {
        exclude: ['organizer_password', 'organizer_pin'],
      },
    });

    // Return the results
    return {
      total: organizers.count,
      organizers: organizers.rows,
    };
  } catch (error) {
    throw new Error(`Error fetching organizers: ${error.message}`);
  }
}

async function updateOrganizerStatusController(organizerId, data) {
  try {
    const { organizer_status, organizer_admin_remarks } = data;

    // Fetch vendor by ID
    const organizer = await Organizer.findOne({ where: { organizer_id: organizerId } });
    if (!organizer) throw new Error(`Organizer with ID ${organizerId} not found.`);

    // Update vendor status and remarks
    organizer.organizer_status = organizer_status;
    organizer.organizer_admin_remarks = organizer_admin_remarks;
    await organizer.save();

    // Email notifications based on status
    if (organizer_status === 'ACTIVE') {
      await sendOrganizerStatusEmail(organizer.organizer_email, {
        subject: 'Vendor Account Activated',
        message: `Congratulations! Your account is now active. Use your PIN: ${organizer.organizer_pin} to log in.`
      });
    } else if (organizer_status === 'PENDING') {
      await sendOrganizerStatusEmail(organizer.organizer_email, {
        subject: 'Vendor Account Under Review',
        message: `Your account is under review. Status: ${organizer_status}. Remarks: ${organizer_admin_remarks}.`
      });
    } else if (organizer_status === 'INACTIVE') {
      await sendOrganizerStatusEmail(organizer.organizer_email, {
        subject: 'Vendor Account Inactive',
        message: `Your account has been marked as inactive. Status: ${organizer_status}. Remarks: ${organizer_admin_remarks}.`
      });
    }

    logger.info(`Organizer with ID ${organizerId} updated successfully.`);
    return { message: 'Organizer status updated successfully.' };
  } catch (error) {
    logger.error(`Error updating organizer status: ${error.message}`);
    throw error;
  }
}

async function organizerLoginController(data) {
  try {
    const { email, password, pin, role } = data;

    // Check if the role is 'ORGANIZER'
    if (role !== 'ORGANIZER') {
      throw new Error('Invalid role. Only ORGANIZER role is allowed.');
    }

    // Find organizer by email
    const organizer = await Organizer.findOne({ where: { organizer_email: email } });
    if (!organizer) {
      throw new Error('Organizer not found.');
    }

    // Check if the pin matches
    if (organizer.organizer_pin !== pin) {
      throw new Error('Invalid PIN.');
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, organizer.organizer_password);
    if (!isPasswordValid) {
      throw new Error('Invalid password.');
    }

    // Generate JWT token valid for 48 hours
    const token = jwt.sign(
      {
        organizer_id: organizer.organizer_id,
        email: organizer.organizer_email,
        role: organizer.organizer_role,
      },
      JWT_SECRET,
      { expiresIn: '48h' }
    );

    logger.info(`Organizer logged in successfully: ${organizer.organizer_email}`);
    return {
      message: 'Login successful.',
      token,
      organizer: {
        organizer_id: organizer.organizer_id,
        organizer_email: organizer.organizer_email,
        organizer_role: organizer.organizer_role,
      },
    };
  } catch (error) {
    logger.error(`Login failed: ${error.message}`);
    throw error;
  }
}

async function recoverOrganizerPasswordController(data) {
  const { email, pin, new_password, role } = data;

  // Check if role is ORGANIZER
  if (role !== 'ORGANIZER') {
    throw new Error('Invalid role. Only ORGANIZER role is allowed.');
  }

  // Find organizer by email
  const organizer = await Organizer.findOne({ where: { organizer_email: email } });
  if (!organizer) {
    throw new Error('Organizer not found.');
  }

  // Check if the pin matches
  if (organizer.organizer_pin !== pin) {
    throw new Error('Invalid PIN.');
  }

  // Encrypt new password
  const hashedPassword = await bcrypt.hash(new_password, 10);

  // Update password in DB
  organizer.organizer_password = hashedPassword;
  await organizer.save();

  return { message: 'Password updated successfully.' };
}

async function recoverOrganizerPinController(data) {
  const { email, password, role } = data;

  // Check if role is ORGANIZER
  if (role !== 'ORGANIZER') {
    throw new Error('Invalid role. Only ORGANIZER role is allowed.');
  }

  // Find organizer by email
  const organizer = await Organizer.findOne({ where: { organizer_email: email } });
  if (!organizer) {
    throw new Error('Organizer not found.');
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, organizer.organizer_password);
  if (!isPasswordValid) {
    throw new Error('Invalid password.');
  }

  // Generate new 6-digit PIN
  const newPin = crypto.randomInt(100000, 999999).toString();

  // Update PIN in DB
  organizer.organizer_pin = newPin;
  await organizer.save();

  // Send PIN update email
  const userType = "ORGANIZER"
  await sendPinUpdateEmail(email, newPin, userType);

  return { message: 'New PIN sent to email.' };
}

async function updateOrganizerProfileController(organizerId, data) {
  // Prevent updating restricted fields
  const restrictedFields = [
    'organizer_email',
    'organizer_role',
    'organizer_pin',
    'organizer_status',
    'organizer_admin_remarks',
    'organizer_identification_number_type_one',
    'organizer_identification_number_one',
    'organizer_identification_proof_image_url_one',
    'organizer_identification_number_type_two',
    'organizer_identification_number_two',
    'organizer_identification_proof_image_url_two',
  ];
  for (const field of restrictedFields) {
    if (data[field] !== undefined) {
      throw new Error(`Cannot update field: ${field}`);
    }
  }

  // Check if organizer exists
  const organizer = await Organizer.findByPk(organizerId);
  if (!organizer) {
    throw new Error('Organizer not found.');
  }

  // If updating password, encrypt it
  if (data.organizer_password) {
    data.organizer_password = await bcrypt.hash(data.organizer_password, 10);
  }

  // Update organizer profile
  await organizer.update(data);

  return { message: 'Organizer profile updated successfully.', organizer };
}

module.exports = { registerOrganizerController, organizerLoginController, updateOrganizerProfileController, recoverOrganizerPinController, recoverOrganizerPasswordController, updateOrganizerStatusController, getOrganizersController };
