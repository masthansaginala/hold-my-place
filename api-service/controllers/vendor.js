const { Vendor } = require('../models');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const logger = require('../helpers/logger');
const jwt = require('jsonwebtoken');
const { sendVendorWelcomeEmail, sendVendorAdminAlertEmail, sendVendorStatusEmail, sendPinUpdateEmail } = require('../helpers/mailservice');

const JWT_SECRET = process.env.JWT_SECRET;

async function registerVendorController(data) {
  try {
    // Check if the email already exists
    const vendorExists = await Vendor.findOne({ where: { vendor_email: data.vendor_email } });
    if (vendorExists) {
      logger.error(`Registration failed: Email ${data.vendor_email} already exists.`);
      throw new Error('Email already registered.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.vendor_password, 10);

    // Generate a 6-digit PIN
    const vendorPin = crypto.randomInt(100000, 999999);

    // Create the vendor
    const newVendor = await Vendor.create({
      vendor_first_name: data.vendor_first_name,
      vendor_last_name: data.vendor_last_name,
      vendor_date_of_birth: data.vendor_date_of_birth,
      vendor_gender: data.vendor_gender,
      vendor_email: data.vendor_email,
      vendor_primary_phone_number: data.vendor_primary_phone_number,
      vendor_address_line_one: data.vendor_address_line_one,
      vendor_address_line_two: data.vendor_address_line_two,
      vendor_city: data.vendor_city,
      vendor_state: data.vendor_state,
      vendor_country: data.vendor_country,
      vendor_zipcode: data.vendor_zipcode,
      vendor_role: data.vendor_role,
      vendor_password: hashedPassword,
      vendor_pin: vendorPin,
      vendor_status: data.vendor_status,
      vendor_identification_number_type_one: data.vendor_identification_number_type_one,
      vendor_identification_number_one: data.vendor_identification_number_one,
      vendor_identification_proof_image_url_one: data.vendor_identification_proof_image_url_one,
      vendor_identification_number_type_two: data.vendor_identification_number_type_two,
      vendor_identification_number_two: data.vendor_identification_number_two,
      vendor_identification_proof_image_url_two: data.vendor_identification_proof_image_url_two
    });

    // Send welcome email to vendor
    await sendVendorWelcomeEmail(data.vendor_email);

    // Send alert email to admin
    await sendVendorAdminAlertEmail({
      email: data.vendor_email,
      phone: data.vendor_primary_phone_number,
      name: `${data.vendor_first_name} ${data.vendor_last_name}`
    });

    logger.info(`Vendor registered successfully: ${data.vendor_email}`);
    return { message: 'Vendor registered successfully and is under review.', vendor: { email: newVendor.vendor_email } };
  } catch (error) {
    logger.error(`Vendor registration failed: ${error.message}`);
    throw error;
  }
}

async function getVendorsController(query) {
  try {
    const { offset = 0, limit = 10, ...filters } = query;

    // Build the query conditions
    const whereConditions = { deleted_at: null }; // Exclude soft-deleted records

    // Add optional search filters
    if (filters.vendor_id) whereConditions.vendor_id = filters.vendor_id;
    if (filters.vendor_first_name) whereConditions.vendor_first_name = filters.vendor_first_name;
    if (filters.vendor_last_name) whereConditions.vendor_last_name = filters.vendor_last_name;
    if (filters.vendor_email) whereConditions.vendor_email = filters.vendor_email;
    if (filters.vendor_city) whereConditions.vendor_city = filters.vendor_city;
    if (filters.vendor_state) whereConditions.vendor_state = filters.vendor_state;
    if (filters.vendor_country) whereConditions.vendor_country = filters.vendor_country;
    if (filters.vendor_zipcode) whereConditions.vendor_zipcode = filters.vendor_zipcode;
    if (filters.vendor_status) whereConditions.vendor_status = filters.vendor_status;

    const vendors = await Vendor.findAndCountAll({
      where: whereConditions,
      offset: parseInt(offset),
      limit: parseInt(limit)
    });

    return {
      total: vendors.count,
      vendors: vendors.rows
    };
  } catch (error) {
    throw new Error(`Error fetching vendors: ${error.message}`);
  }
}

async function updateVendorStatusController(vendorId, data) {
  try {
    const { vendor_status, vendor_admin_remarks } = data;

    // Fetch vendor by ID
    const vendor = await Vendor.findOne({ where: { vendor_id: vendorId } });
    if (!vendor) throw new Error(`Vendor with ID ${vendorId} not found.`);

    // Update vendor status and remarks
    vendor.vendor_status = vendor_status;
    vendor.vendor_admin_remarks = vendor_admin_remarks;
    await vendor.save();

    // Email notifications based on status
    if (vendor_status === 'ACTIVE') {
      await sendVendorStatusEmail(vendor.vendor_email, {
        subject: 'Vendor Account Activated',
        message: `Congratulations! Your account is now active. Use your PIN: ${vendor.vendor_pin} to log in.`
      });
    } else if (vendor_status === 'PENDING') {
      await sendVendorStatusEmail(vendor.vendor_email, {
        subject: 'Vendor Account Under Review',
        message: `Your account is under review. Status: ${vendor_status}. Remarks: ${vendor_admin_remarks}.`
      });
    } else if (vendor_status === 'INACTIVE') {
      await sendVendorStatusEmail(vendor.vendor_email, {
        subject: 'Vendor Account Inactive',
        message: `Your account has been marked as inactive. Status: ${vendor_status}. Remarks: ${vendor_admin_remarks}.`
      });
    }

    logger.info(`Vendor with ID ${vendorId} updated successfully.`);
    return { message: 'Vendor status updated successfully.' };
  } catch (error) {
    logger.error(`Error updating vendor status: ${error.message}`);
    throw error;
  }
}

async function vendorLoginController(data) {
  try {
    const { email, password, pin, role } = data;

    // Check if the role is 'VENDOR'
    if (role !== 'VENDOR') {
      throw new Error('Invalid role. Only VENDOR role is allowed.');
    }

    // Find vendor by email
    const vendor = await Vendor.findOne({ where: { vendor_email: email } });
    if (!vendor) {
      throw new Error('Vendor not found.');
    }

    // Check if the pin matches
    if (vendor.vendor_pin !== pin) {
      throw new Error('Invalid PIN.');
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, vendor.vendor_password);
    if (!isPasswordValid) {
      throw new Error('Invalid password.');
    }

    // Generate JWT token valid for 48 hours
    const token = jwt.sign(
      {
        vendor_id: vendor.vendor_id,
        email: vendor.vendor_email,
        role: vendor.vendor_role,
      },
      JWT_SECRET,
      { expiresIn: '48h' }
    );

    logger.info(`Vendor logged in successfully: ${vendor.vendor_email}`);
    return {
      message: 'Login successful.',
      token,
      vendor: {
        vendor_id: vendor.vendor_id,
        vendor_email: vendor.vendor_email,
        vendor_role: vendor.vendor_role,
      },
    };
  } catch (error) {
    logger.error(`Login failed: ${error.message}`);
    throw error;
  }
}

async function updateVendorProfileController(vendorId, data) {
  // Prevent updating restricted fields
  const restrictedFields = [
    'vendor_email',
    'vendor_role',
    'vendor_pin',
    'vendor_status',
    'vendor_admin_remarks',
    'vendor_identification_number_type_one',
    'vendor_identification_number_one',
    'vendor_identification_proof_image_url_one',
    'vendor_identification_number_type_two',
    'vendor_identification_number_two',
    'vendor_identification_proof_image_url_two',
  ];
  for (const field of restrictedFields) {
    if (data[field] !== undefined) {
      throw new Error(`Cannot update field: ${field}`);
    }
  }

  // Check if vendor exists
  const vendor = await Vendor.findByPk(vendorId);
  if (!vendor) {
    throw new Error('Vendor not found.');
  }

  // If updating password, encrypt it
  if (data.vendor_password) {
    data.vendor_password = await bcrypt.hash(data.vendor_password, 10);
  }

  // Update vendor profile
  await vendor.update(data);

  return { message: 'Vendor profile updated successfully.', vendor };
}

async function recoverVendorPasswordController(data) {
  const { email, pin, new_password, role } = data;

  // Ensure role is VENDOR
  if (role !== 'VENDOR') {
    throw new Error('Invalid role. Only VENDOR role is allowed.');
  }

  // Find vendor by email
  const vendor = await Vendor.findOne({ where: { vendor_email: email } });
  if (!vendor) {
    throw new Error('Vendor not found.');
  }

  // Check if the pin matches
  if (vendor.vendor_pin !== pin) {
    throw new Error('Invalid PIN.');
  }

  // Encrypt the new password
  const hashedPassword = await bcrypt.hash(new_password, 10);

  // Update password in the database
  vendor.vendor_password = hashedPassword;
  await vendor.save();

  return { message: 'Password updated successfully.' };
}
  
async function recoverVendorPinController(data) {
  const { email, password, role } = data;

  // Ensure role is VENDOR
  if (role !== 'VENDOR') {
    throw new Error('Invalid role. Only VENDOR role is allowed.');
  }

  // Find vendor by email
  const vendor = await Vendor.findOne({ where: { vendor_email: email } });
  if (!vendor) {
    throw new Error('Vendor not found.');
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, vendor.vendor_password);
  if (!isPasswordValid) {
    throw new Error('Invalid password.');
  }

  // Generate new 6-digit PIN
  const newPin = crypto.randomInt(100000, 999999).toString();

  // Update PIN in the database
  vendor.vendor_pin = newPin;
  await vendor.save();

  // Send the new PIN via email
  const userType = "VENDOR"
  await sendPinUpdateEmail(email, newPin, userType);

  return { message: 'New PIN sent to email.' };
}

module.exports = { 
  registerVendorController,
  getVendorsController,
  updateVendorStatusController, 
  vendorLoginController,
  updateVendorProfileController,
  recoverVendorPasswordController,
  recoverVendorPinController
};
