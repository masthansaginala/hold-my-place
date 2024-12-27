const Joi = require('joi');
const { Op } = require('sequelize');
const models = require('../models');
const { sendSupportRequestCreationEmail, sendSupportRequestUpdateEmail } = require('../helpers/mailservice');

const createSupportSchema = Joi.object({
    support_name: Joi.string().required(),
    support_email: Joi.string().email().required(),
    support_phone_number: Joi.string().required(),
    support_type: Joi.string().valid('USER', 'ORGANIZER', 'VENDOR').required(),
    support_subject: Joi.string().required(),
    support_message: Joi.string().required(),
});

const updateSupportSchema = Joi.object({
    support_email: Joi.string().email().required(),
    support_status: Joi.string().valid('Pending', 'In Progress', 'Resolved', 'Closed').required(),
    support_remarks: Joi.string().optional(),
});

async function createSupport(req, res) {
    try {
        // Validate the request body
        const { error } = createSupportSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Create the support record
        const support = await models.Support.create(req.body);

        await sendSupportRequestCreationEmail(req.body);

        res.status(201).json({ message: 'Support ticket created successfully', support });
    } catch (err) {
        console.error('Error creating support ticket:', err.message);
        res.status(500).json({ error: 'An error occurred while creating the support ticket' });
    }
}

async function listSupport(req, res) {
    try {
        const {
            support_id,
            support_name,
            support_status,
            created_at,
            support_type,
            support_email,
            support_subject,
            limit = 10,
            offset = 0,
        } = req.query;

        // Build query filters
        const whereCondition = {};
        if (support_id) whereCondition.support_id = support_id;
        if (support_name) whereCondition.support_name = { [Op.iLike]: `%${support_name}%` };
        if (support_status) whereCondition.support_status = support_status;
        if (created_at) whereCondition.created_at = created_at;
        if (support_type) whereCondition.support_type = support_type;
        if (support_email) whereCondition.support_email = { [Op.iLike]: `%${support_email}%` };
        if (support_subject) whereCondition.support_subject = { [Op.iLike]: `%${support_subject}%` };

        // Fetch records with pagination
        const supports = await models.Support.findAndCountAll({
            where: whereCondition,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.status(200).json({
            total: supports.count,
            supports: supports.rows,
        });
    } catch (err) {
        console.error('Error fetching support tickets:', err.message);
        res.status(500).json({ error: 'An error occurred while fetching support tickets' });
    }
}

async function updateSupport(req, res) {
    try {
        const { id } = req.params;

        // Validate request body
        const { error } = updateSupportSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Find the support ticket
        const support = await models.Support.findByPk(id);
        if (!support) {
            return res.status(404).json({ error: 'Support ticket not found' });
        }

        // Update the support ticket
        const updateSupport = await support.update({...req.body, updated_at: new Date() });

        const { support_email, support_status, support_remarks } = req.body;

        await sendSupportRequestUpdateEmail(support_email, support_status, support_remarks);

        res.status(200).json({ message: 'Support ticket updated successfully', updateSupport });
    } catch (err) {
        console.error('Error updating support ticket:', err.message);
        res.status(500).json({ error: 'An error occurred while updating the support ticket' });
    }
}

module.exports = { 
    createSupport, 
    listSupport, 
    updateSupport 
};