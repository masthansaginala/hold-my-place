const Joi = require('joi');
const { Op } = require('sequelize');
const models = require('../models');
const { sendContactRequestCreationEmail, sendContactRequestUpdateEmail } = require('../helpers/mailservice');

const createContactSchema = Joi.object({
  contact_name: Joi.string().required(),
  contact_phone_number: Joi.string().required(),
  contact_email: Joi.string().email().required(),
  contact_subject: Joi.string().required(),
  contact_message: Joi.string().required(),
});

const updateContactSchema = Joi.object({
    contact_email: Joi.string().email().required(),
    contact_status: Joi.string().valid('Pending', 'In Progress', 'Resolved', 'Closed').required(),
    contact_remarks: Joi.string().required(),
});

async function createContact(req, res) {
  try {
    // Validate request body
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create the contact
    const newContact = await models.Contact.create({
      ...req.body,
      contact_status: 'Pending', // Default status
    });

    await sendContactRequestCreationEmail(req.body);

    res.status(201).json({ message: 'Contact created successfully', newContact });
  } catch (err) {
    console.error('Error creating contact:', err.message);
    res.status(500).json({ error: 'An error occurred while creating the contact' });
  }
}

async function getContacts(req, res) {
  const { contact_id, contact_status, contact_name, contact_email, contact_phone_number, created_at} = req.query;

  try {
    const whereCondition = {};

    if (contact_id) whereCondition.contact_id = contact_id;
    if (contact_status) whereCondition.contact_status = contact_status;
    if (contact_name) whereCondition.contact_name = { [Op.iLike]: `%${contact_name}%` };
    if (contact_email) whereCondition.contact_email = { [Op.iLike]: `%${contact_email}%` };
    if (contact_phone_number) whereCondition.contact_phone_number = { [Op.iLike]: `%${contact_phone_number}%` };
    if (created_at) whereCondition.created_at = { [Op.eq]: new Date(created_at) };

    const contacts = await models.Contact.findAndCountAll({
      where: whereCondition
    });

    res.status(200).json({
      total: contacts.count,
      contacts: contacts.rows,
    });
  } catch (err) {
    console.error('Error fetching contacts:', err.message);
    res.status(500).json({ error: 'An error occurred while fetching contacts' });
  }
}

async function updateContact(req, res) {
    const { contact_id } = req.params;
  
    try {
      // Validate request body
      const { error } = updateContactSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // Find and update the contact
      const contact = await models.Contact.findByPk(contact_id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
  
      const updatedContact = await contact.update({...req.body, updated_at: new Date() });

      const { contact_email, contact_status, contact_remarks } = req.body;
      await sendContactRequestUpdateEmail(contact_email, contact_status, contact_remarks);

      res.status(200).json({ message: 'Contact updated successfully', updatedContact });
    } catch (err) {
      console.error('Error updating contact:', err.message);
      res.status(500).json({ error: 'An error occurred while updating the contact' });
    }
}

module.exports = { 
  createContact, 
  getContacts, 
  updateContact 
};
