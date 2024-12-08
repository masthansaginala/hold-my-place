const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { sendUserWelcomeEmail } = require('../helpers/mailservice');

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
      return res.status(400).json({ message: 'Email already exists' });
    }

    const existingUserPhone = await User.findOne({ where: { user_phone_number } });
    if (existingUserPhone) {
      return res.status(400).json({ message: 'Phone Number already exists' });
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
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerUserController };
