const nodemailer = require('nodemailer');
const logger = require('./logger');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

async function sendUserWelcomeEmail(to, pin) {
  const subject = 'Welcome to HoldMyPlace!';
  const text = `Hello,\n\nWelcome to HoldMyPlace! Your registration was successful.\n\nYour 6-digit PIN is: ${pin}\n\nThank you for joining us!`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendOrganizerWelcomeEmail(to, pin) {
  const subject = 'Welcome to HoldMyPlace!';
  const text = `Hello,\n\nWelcome to HoldMyPlace! Your registration was successful.\n\nYour 6-digit PIN is: ${pin}\n\nThank you for joining us!`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error.message}`);
    throw new Error('Error sending email.');
  }

}

async function sendVendorWelcomeEmail(email) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Welcome to HoldMyPlace!',
    text: `Welcome to HoldMyPlace! Your registration is successful, and your application is under review. You will hear from us soon. Thank you`
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${mailOptions.to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendVendorAdminAlertEmail({ email, phone, name }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: 'New Vendor Registration Alert',
    text: `A new vendor has registered. Details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${mailOptions.to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendVendorStatusEmail(email, { subject, message }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${mailOptions.to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendVendorBusinessWelcomeEmail({ email, businessName }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Welcome to HoldMyPlace!',
    text: `Congratulations! Your business "${businessName}" has been registered successfully and is under review. We will get back to you soon.`
  };
  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${mailOptions.to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendVendorBusinessAdminAlertEmail({ businessName, vendorName, vendorEmail, businessEmail }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: 'New Vendor Business Registration Alert',
    text: `A new vendor business has been registered. Details:\n\nBusiness Name: ${businessName}\nVendor Name: ${vendorName}\nVendor Email: ${vendorEmail}\nBusiness Email: ${businessEmail}`
  };
  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${mailOptions.to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendVendorBusinessStatusEmail(email, { subject, message }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: subject,
    text: message
  };
  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${mailOptions.to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendBookingConfirmationEmail({ email, bookingDetails }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Successfull Booking Confirmation',
    text: `Your booking has been successfully confirmed.\n\nBooking Details:\nBooking ID: ${bookingDetails.booking_id}\nTickets: ${bookingDetails.booking_ticket_count}\nPrice: ${bookingDetails.booking_price}\nStatus: ${bookingDetails.booking_status}\nEvent: ${bookingDetails.event_name}\nDate: ${bookingDetails.event_date}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${mailOptions.to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendBookingCancelConfirmationEmail({ email, bookingDetails }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Cancellation Confirmation for Booking',
    text: `Your booking has been successfully cancelled.\n\nBooking Details:\nBooking ID: ${bookingDetails.booking_id}\nTickets: ${bookingDetails.booking_ticket_count}\nPrice: ${bookingDetails.booking_price}\nStatus: ${bookingDetails.booking_status}\nEvent: ${bookingDetails.event_name}\nDate: ${bookingDetails.event_date}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${mailOptions.to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

module.exports = { 
  sendUserWelcomeEmail, 
  sendOrganizerWelcomeEmail,
  sendVendorWelcomeEmail,
  sendVendorAdminAlertEmail,
  sendVendorStatusEmail,
  sendVendorBusinessWelcomeEmail,
  sendVendorBusinessAdminAlertEmail,
  sendVendorBusinessStatusEmail,
  sendBookingConfirmationEmail,
  sendBookingCancelConfirmationEmail
};
