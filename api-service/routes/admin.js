const Joi = require('joi');
const { adminLoginController  } = require('../controllers/admin');

const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    pin: Joi.number().integer().required(),
    role: Joi.string().valid('ADMIN').required() // Role must be ADMIN
});

async function adminLoginRoute(req, res) {
    try {
        const { error } = adminLoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Extract request body
        const { email, password, pin, role } = req.body;

        // Call the controller and pass the extracted data
        const result = await adminLoginController(email, password, pin, role);

        // Send success response
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in adminLoginRoute:', error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = exports = {
    adminLoginRoute,
};
