const { Vendor_Business, Vendor } = require('../models');
const logger = require('../helpers/logger');
const { sendVendorBusinessWelcomeEmail, sendVendorBusinessAdminAlertEmail, sendVendorBusinessStatusEmail } = require('../helpers/mailservice');

async function createVendorBusinessController(data) {
  try {
    // Check if a business with the same name already exists
    const businessExists = await Vendor_Business.findOne({
      where: { vendor_business_name: data.vendor_business_name }
    });
    if (businessExists) {
      logger.error(`Business registration failed: Business name ${data.vendor_business_name} already exists.`);
      throw new Error('Business with this name already exists.');
    }

    // Create the business
    const newBusiness = await Vendor_Business.create({
      vendor_id: data.vendor_id,
      vendor_business_name: data.vendor_business_name,
      vendor_business_date_of_establishment: data.vendor_business_date_of_establishment,
      vendor_business_license_number: data.vendor_business_license_number,
      vendor_business_proof_type: data.vendor_business_proof_type,
      vendor_business_proof_image_url: data.vendor_business_proof_image_url,
      vendor_business_image_url: data.vendor_business_image_url,
      vendor_business_email: data.vendor_business_email,
      vendor_business_primary_phone_number: data.vendor_business_primary_phone_number,
      vendor_business_secondary_phone_number: data.vendor_business_secondary_phone_number,
      vendor_business_address_line_one: data.vendor_business_address_line_one,
      vendor_business_address_line_two: data.vendor_business_address_line_two,
      vendor_business_city: data.vendor_business_city,
      vendor_business_state: data.vendor_business_state,
      vendor_business_country: data.vendor_business_country,
      vendor_business_zipcode: data.vendor_business_zipcode,
      vendor_business_service_category: data.vendor_business_service_category,
      vendor_business_description: data.vendor_business_description,
      vendor_business_status: data.vendor_business_status,
      vendor_business_admin_remarks: data.vendor_business_admin_remarks
    });

    // Fetch vendor details for email
    const vendor = await Vendor.findOne({ where: { vendor_id: data.vendor_id } });
    if (!vendor) {
      throw new Error(`Vendor with ID ${data.vendor_id} not found.`);
    }

    // Send welcome email to the vendor
    await sendVendorBusinessWelcomeEmail({
      email: vendor.vendor_email,
      businessName: data.vendor_business_name
    });

    // Send alert email to admin
    await sendVendorBusinessAdminAlertEmail({
      businessName: data.vendor_business_name,
      vendorName: `${vendor.vendor_first_name} ${vendor.vendor_last_name}`,
      vendorEmail: vendor.vendor_email,
      businessEmail: data.vendor_business_email
    });

    logger.info(`Vendor business created successfully: ${data.vendor_business_name}`);
    return { message: 'Vendor business created successfully and is under review.' };
  } catch (error) {
    logger.error(`Error creating vendor business: ${error.message}`);
    throw error;
  }
}

async function getVendorBusinessesController(query) {
  try {
    const filters = query;

    // Build the query conditions
    const whereConditions = { deleted_at: null }; // Include only non-deleted records

    // Add optional search filters
    if (filters.vendor_business_id) whereConditions.vendor_business_id = filters.vendor_business_id;
    if (filters.vendor_id) whereConditions.vendor_id = filters.vendor_id;
    if (filters.vendor_business_name) whereConditions.vendor_business_name = filters.vendor_business_name;
    if (filters.vendor_business_email) whereConditions.vendor_business_email = filters.vendor_business_email;
    if (filters.vendor_business_city) whereConditions.vendor_business_city = filters.vendor_business_city;
    if (filters.vendor_business_state) whereConditions.vendor_business_state = filters.vendor_business_state;
    if (filters.vendor_business_country) whereConditions.vendor_business_country = filters.vendor_business_country;
    if (filters.vendor_business_zipcode) whereConditions.vendor_business_zipcode = filters.vendor_business_zipcode;
    if (filters.vendor_business_service_category) whereConditions.vendor_business_service_category = filters.vendor_business_service_category;
    if (filters.vendor_business_description) whereConditions.vendor_business_description = filters.vendor_business_description;
    if (filters.vendor_business_status) whereConditions.vendor_business_status = filters.vendor_business_status;

    const vendorBusinesses = await Vendor_Business.findAndCountAll({
      where: whereConditions
    });

    return {
      total: vendorBusinesses.count,
      vendorBusinesses: vendorBusinesses.rows
    };
  } catch (error) {
    throw new Error(`Error fetching vendor businesses: ${error.message}`);
  }
}

async function updateVendorBusinessStatusController(vendorBusinessId, data) {
  try {
    const { vendor_business_status, vendor_business_admin_remarks } = data;

    // Fetch the vendor business by ID
    const business = await Vendor_Business.findOne({ where: { vendor_business_id: vendorBusinessId } });
    if (!business) throw new Error(`Vendor business with ID ${vendorBusinessId} not found.`);

    // Update the status and remarks
    business.vendor_business_status = vendor_business_status;
    business.vendor_business_admin_remarks = vendor_business_admin_remarks;
    await business.save();

    // Send email based on status
    if (vendor_business_status === 'ACTIVE') {
      await sendVendorBusinessStatusEmail(business.vendor_business_email, {
        subject: 'Business Enrolled Successfully',
        message: `Congratulations! Your business "${business.vendor_business_name}" has been successfully enrolled.`
      });
    } else if (vendor_business_status === 'PENDING') {
      await sendVendorBusinessStatusEmail(business.vendor_business_email, {
        subject: 'Business Status: Pending',
        message: `Your business is under review. Status: ${vendor_business_status}. Remarks: ${vendor_business_admin_remarks}.`
      });
    } else if (vendor_business_status === 'INACTIVE') {
      await sendVendorBusinessStatusEmail(business.vendor_business_email, {
        subject: 'Business Inactive',
        message: `Your business has been marked as inactive. Status: ${vendor_business_status}. Remarks: ${vendor_business_admin_remarks}.`
      });
    }

    logger.info(`Vendor business with ID ${vendorBusinessId} updated successfully.`);
    return { message: 'Vendor business status updated successfully.' };
  } catch (error) {
    logger.error(`Error updating vendor business status: ${error.message}`);
    throw error;
  }
}

module.exports = { createVendorBusinessController, getVendorBusinessesController, updateVendorBusinessStatusController };
