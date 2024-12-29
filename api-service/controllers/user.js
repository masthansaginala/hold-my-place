const { User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger');
const { sendUserWelcomeEmail, sendPinUpdateEmail } = require('../helpers/mailservice');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const generatePin = () => Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit PIN

const registerUserController = async (req, res) => {
  try {
    const {
      user_first_name,
      user_last_name,
      user_date_of_birth,
      user_gender,
      user_email,
      user_phone_number,
      user_address_line_one,
      user_address_line_two,
      user_city,
      user_state,
      user_country,
      user_zipcode,
      user_role,
      user_password,
      user_status,
    } = req.body;

    // Check if the user already exists
    const existingUserEmail = await User.findOne({ where: { user_email } });
    if (existingUserEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const existingUserPhone = await User.findOne({ where: { user_phone_number } });
    if (existingUserPhone) {
      return res.status(400).json({ error: 'Phone Number already exists' });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Generate a 6-digit PIN
    const userPin = generatePin();

    // Save user in the database
    const newUser = await User.create({
      user_first_name,
      user_last_name,
      user_date_of_birth,
      user_gender,
      user_email,
      user_phone_number,
      user_address_line_one,
      user_address_line_two,
      user_city,
      user_state,
      user_country,
      user_zipcode,
      user_role,
      user_password: hashedPassword,
      user_pin: userPin,
      user_status,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Send welcome email with the PIN
    await sendUserWelcomeEmail(user_email, userPin);

    return res.status(201).json({ message: 'User registered successfully', user: { user_email: newUser.user_email} });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function userLoginController(data) {
  try {
    const { email, password, pin, role } = data;

    // Check if the role is 'USER'
    if (role !== 'USER') {
      throw new Error('Invalid role. Only USER role is allowed.');
    }

    // Find user by email
    const user = await User.findOne({ where: { user_email: email } });
    if (!user) {
      throw new Error('User not found.');
    }

    // Check if the pin matches
    if (user.user_pin !== pin) {
      throw new Error('Invalid PIN.');
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.user_password);
    if (!isPasswordValid) {
      throw new Error('Invalid password.');
    }

    // Generate JWT token valid for 48 hours
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.user_email,
        role: user.user_role,
      },
      JWT_SECRET,
      { expiresIn: '48h' }
    );

    logger.info(`User logged in successfully: ${user.user_email}`);
    return {
      message: 'Login successful.',
      token,
      user: {
        user_id: user.user_id,
        user_email: user.user_email,
        user_role: user.user_role,
      },
    };
  } catch (error) {
    logger.error(`Login failed: ${error.message}`);
    throw error;
  }
}

async function recoverUserPasswordController(data) {
  const { email, pin, new_password, role } = data;

  // Check if role is USER
  if (role !== 'USER') {
    throw new Error('Invalid role. Only USER role is allowed.');
  }

  // Find user by email
  const user = await User.findOne({ where: { user_email: email } });
  if (!user) {
    throw new Error('User not found.');
  }

  // Check if the pin matches
  if (user.user_pin !== pin) {
    throw new Error('Invalid PIN.');
  }

  // Encrypt new password
  const hashedPassword = await bcrypt.hash(new_password, 10);

  // Update password in DB
  user.user_password = hashedPassword;
  await user.save();

  return { message: 'Password updated successfully.' };
}

async function recoverUserPinController(data) {
  const { email, password, role } = data;

  // Check if role is USER
  if (role !== 'USER') {
    throw new Error('Invalid role. Only USER role is allowed.');
  }

  // Find user by email
  const user = await User.findOne({ where: { user_email: email } });
  if (!user) {
    throw new Error('User not found.');
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.user_password);
  if (!isPasswordValid) {
    throw new Error('Invalid password.');
  }

  // Generate new 6-digit PIN
  const newPin = crypto.randomInt(100000, 999999).toString();

  // Update PIN in DB
  user.user_pin = newPin;
  await user.save();

  // Send PIN update email
  const userType = "USER";
  await sendPinUpdateEmail(email, newPin, userType);

  return { message: 'New PIN sent to email.' };
}

async function updateUserProfileController(userId, data) {
  // Prevent updating restricted fields
  const restrictedFields = ['user_status', 'user_pin', 'user_email', 'user_role'];
  for (const field of restrictedFields) {
    if (data[field] !== undefined) {
      throw new Error(`Cannot update field: ${field}`);
    }
  }

  // Check if user exists
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  // If updating password, encrypt it
  if (data.user_password) {
    data.user_password = await bcrypt.hash(data.user_password, 10);
  }

  // Update user profile
  await user.update(data);

  return { message: 'User profile updated successfully.', user };
}

async function getUsers(req, res) {
  try {
    // Pagination parameters
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    // Filter parameters
    const { user_id, user_email } = req.query;

    // Building the filters
    const filters = {};
    if (user_id) filters.user_id = user_id;
    if (user_email) filters.user_email = { [Op.iLike]: `%${user_email}%` };

    // Fetch users with pagination and filters
    const { count, rows: users } = await User.findAndCountAll({
      where: filters,
      attributes: { exclude: ['user_password', 'user_pin'] },
      limit,
      offset,
      order: [['created_at', 'DESC']], // Sort by latest created first
    });

    res.status(200).json({
      total: count,
      users: users,
    });
  } catch (error) {
    console.error(`Error fetching users: ${error.message}`);
    res.status(500).json({
      error: 'Failed to fetch users',
    });
  }
};

module.exports = { registerUserController, userLoginController, recoverUserPasswordController, recoverUserPinController, updateUserProfileController, getUsers };
