const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function adminLoginController(email, password, pin, role) {
    try {
        // Step 1: Find the admin by email
        const admin = await models.Admin.findOne({ where: { admin_email: email, deleted_at: null } });
        if (!admin) {
            throw new Error('Admin with this email does not exist');
        }

        // Step 2: Validate the password
        const isPasswordValid = await bcrypt.compare(password, admin.admin_password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Step 3: Validate the PIN
        if (parseInt(admin.admin_pin) !== parseInt(pin)) {
            throw new Error('Invalid PIN');
        }

        // Step 4: Validate the role
        if (role !== 'ADMIN') {
            throw new Error('Invalid role');
        }

        // Step 5: Generate JWT token
        const token = jwt.sign(
            { adminId: admin.admin_id, email: admin.admin_email, role },
            process.env.JWT_SECRET,
            { expiresIn: '48h' }
        );

        // Step 6: Return response object
        return {
            message: 'Login successful',
            token,
            admin: {
                admin_id: admin.admin_id,
                admin_email: admin.admin_email,
                admin_role: admin.role
            }
        };
    } catch (error) {
        console.error('Error in adminLoginController:', error.message);
        throw error; // Propagate the error back to the route
    }
}

module.exports = {
    adminLoginController,
  };