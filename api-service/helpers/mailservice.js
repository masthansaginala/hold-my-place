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
  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 10px;">
      <h1 style="color: #007bff;">Welcome to HoldMyPlace!</h1>
      <p style="font-size: 18px; color: #555;">Your one-stop solution for seamless and hassle-free event booking.</p>
      
      <div style="margin: 20px auto; padding: 15px; background-color: #fff; border-radius: 10px; border: 1px solid #ddd; display: inline-block; width: fit-content;">
        <h3 style="margin: 0; color: #007bff;">Your 6-Digit PIN</h3>
        <p style="font-size: 22px; font-weight: bold; margin: 5px 0; color: #333;">${pin}</p>
      </div>
      
      <p style="font-size: 16px; color: #555;">Thank you for joining HoldMyPlace. We are thrilled to have you onboard to explore and attend unforgettable events.</p>
      
      <img src="https://holdmyplaceimages.blob.core.windows.net/holdmyimage/6f094745-12e4-4575-908c-46d728a761a0-welcome-hmp.png" alt="Welcome to HoldMyPlace" style="width: 300px; height: auto; margin: 20px auto; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
      
      <p style="font-size: 16px; color: #555; margin-top: 20px;">Explore Events, Enjoy seemless booking, and enjoy a smooth experience.</p>
      
      <a href="https://holdmyplace.com/login" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Log in to Your Account</a>
      
      <p style="margin-top: 20px; font-size: 14px; color: #777;">If you have any questions, feel free to reach out to our support team at <a href="mailto:support@holdmyplace.com" style="color: #007bff; text-decoration: none;">support@holdmyplace.com</a>.</p>
      
      <p style="font-size: 14px; color: #999; margin-top: 20px;">Thank you for choosing HoldMyPlace. Together, let’s create memorable events!</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Welcome email sent to ${to}`);
  } catch (error) {
    logger.error(`Failed to send welcome email to ${to}: ${error.message}`);
    throw new Error('Error sending welcome email.');
  }
}

async function sendOrganizerWelcomeEmail(to) {
  const subject = 'Welcome to HoldMyPlace - Your Account is Under Review!';
  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 10px;">
    
      <img src="https://holdmyplaceimages.blob.core.windows.net/holdmyimage/0b5071b7-dca8-4eab-966d-7eb8ec6f1bdc-welcome-org.png" alt="Welcome to HoldMyPlace" style="width: 300px; height: auto; margin: 20px auto; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
    
      <h1 style="color: #007bff;">Welcome to HoldMyPlace!</h1>
      <p style="font-size: 18px; color: #555;">Your one-stop platform for seamless event management.</p>
      
      <div style="margin: 20px auto; padding: 15px; background-color: #fff; border-radius: 10px; border: 1px solid #ddd; display: inline-block; width: fit-content;">
        <h3 style="margin: 0; color: #007bff;">Account Status: Under Review</h3>
        <p style="font-size: 16px; color: #333; margin: 10px 0;">Our team is currently reviewing your details. You will be notified once the review is complete.</p>
      </div>
      
      <p style="font-size: 16px; color: #555;">Thank you for registering as an Organizer on HoldMyPlace. We are excited to have you onboard to create and manage events effortlessly.</p>
      

      
      <p style="font-size: 16px; color: #555; margin-top: 20px;">As an Organizer, you can access tools and services to ensure a hassle-free event experience for your attendees.</p>
      
      <a href="https://holdmyplace.com/login" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Log in to Your Account</a>
      
      <p style="margin-top: 20px; font-size: 14px; color: #777;">If you have any questions, feel free to reach out to our support team at <a href="mailto:support@holdmyplace.com" style="color: #007bff; text-decoration: none;">support@holdmyplace.com</a>.</p>
      
      <p style="font-size: 14px; color: #999; margin-top: 20px;">Thank you for choosing HoldMyPlace. Together, let’s make event management seamless!</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Welcome email sent to ${to}`);
  } catch (error) {
    logger.error(`Failed to send welcome email to ${to}: ${error.message}`);
    throw new Error('Error sending welcome email.');
  }
}

async function sendOrganizerStatusEmail(email, { subject, message }) {
  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 10px;">
      <img src="https://holdmyplaceimages.blob.core.windows.net/holdmyimage/92654e52-f522-4649-9f82-7b139ae6a1e5-new-alert-hmp.png" alt="HoldMyPlace Alert" style="width: 300px; height: auto; margin: 20px auto; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
      
      <h1 style="color: #007bff;">${subject}</h1>
      <p style="font-size: 18px; color: #555;">${message}</p>

      <p style="font-size: 16px; color: #555; margin-top: 20px;">If you have any questions or need assistance, feel free to reach out to us at:</p>
      <a href="mailto:support@holdmyplace.com" style="font-size: 16px; color: #007bff; text-decoration: none;">support@holdmyplace.com</a>
      
      <p style="margin-top: 20px; font-size: 14px; color: #777;">Thank you for choosing HoldMyPlace. We are here to ensure a seamless experience for all your event management needs.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Alert/Update email sent to ${email}`);
  } catch (error) {
    logger.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendOrganizerAdminAlertEmail({ email, phone, name }) {
  const subject = 'New Organizer Registration Alert';
  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 10px;">
      <img src="https://holdmyplaceimages.blob.core.windows.net/holdmyimage/0b5071b7-dca8-4eab-966d-7eb8ec6f1bdc-welcome-org.png" alt="Welcome to HoldMyPlace" style="width: 300px; height: auto; margin: 20px auto; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #007bff;">${subject}</h1>
      <p style="font-size: 18px; color: #555;">A new organizer has registered on HoldMyPlace.</p>

      <div style="margin: 20px auto; padding: 15px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd; display: inline-block; width: fit-content;">
        <h3 style="margin: 0; color: #007bff;">Organizer Details</h3>
        <p style="font-size: 16px; color: #333; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px; color: #333; margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
        <p style="font-size: 16px; color: #333; margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
      </div>

      <p style="font-size: 16px; color: #555; margin-top: 20px;">Please review the organizer's details and take the necessary action in the admin panel.</p>
      
      <a href="https://holdmyplace-admin.com/review-organizers" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Review Organizer</a>
      
      <p style="margin-top: 20px; font-size: 14px; color: #777;">If you have any questions, contact support at <a href="mailto:support@holdmyplace.com" style="color: #007bff; text-decoration: none;">support@holdmyplace.com</a>.</p>
      
      <p style="font-size: 14px; color: #999; margin-top: 20px;">Thank you for using HoldMyPlace. We are here to make event management seamless and hassle-free.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Admin alert email sent for new organizer: ${email}`);
  } catch (error) {
    logger.error(`Failed to send admin alert email: ${error.message}`);
    throw new Error('Error sending admin alert email.');
  }
}

async function sendVendorWelcomeEmail(email) {

  const subject = 'Welcome to HoldMyPlace!';
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/458d16a3-8dee-4c16-8b90-39c7806d1067-welcome-vendor.png';
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <img src="${imageUrl}" alt="HoldMyPlace Alert" style="width: 150px; height: auto; margin-bottom: 20px;">
      <h1 style="color: #4caf50;">Welcome to HoldMyPlace!</h1>
      <p>Thank you for registering with HoldMyPlace. Your application is under review, and you will hear from us soon.</p>
      <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
      <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
      <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html: htmlContent,
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

  const subject = 'New Vendor Registration Alert';
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/458d16a3-8dee-4c16-8b90-39c7806d1067-welcome-vendor.png';
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <img src="${imageUrl}" alt="HoldMyPlace Alert" style="width: 150px; height: auto; margin-bottom: 20px;">
      <h1 style="color: #d32f2f;">New Vendor Registration Alert</h1>
      <p>A new vendor has registered on HoldMyPlace. Below are the details:</p>
      <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      </div>
      <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
      <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
      <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html: htmlContent,
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

  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/92654e52-f522-4649-9f82-7b139ae6a1e5-new-alert-hmp.png';
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <img src="${imageUrl}" alt="HoldMyPlace Alert" style="width: 150px; height: auto; margin-bottom: 20px;">
      <h1 style="color: #4caf50;">Vendor Status Update</h1>
      <p>${message}</p>
      <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
      <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
      <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html: htmlContent,
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
  const subject = 'Welcome to HoldMyPlace!';
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/9b517c73-808e-47f0-8a40-832710b8e64e-vndrbs.png';
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <img src="${imageUrl}" alt="HoldMyPlace Alert" style="width: 150px; height: auto; margin-bottom: 20px;">
      <h1 style="color: #4caf50;">Welcome to HoldMyPlace!</h1>
      <p>Congratulations! Your business "<strong>${businessName}</strong>" has been registered successfully and is under review.</p>
      <p style="margin-top: 20px;">We will get back to you soon. Thank you for joining us!</p>
      <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
      <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
      <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html: htmlContent,
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
  const subject = 'New Vendor Business Registration Alert';
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/9b517c73-808e-47f0-8a40-832710b8e64e-vndrbs.png';
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <img src="${imageUrl}" alt="HoldMyPlace Alert" style="width: 150px; height: auto; margin-bottom: 20px;">
      <h1 style="color: #d32f2f;">New Vendor Business Registration Alert</h1>
      <p>A new vendor business has been registered. Below are the details:</p>
      <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Vendor Name:</strong> ${vendorName}</p>
        <p><strong>Vendor Email:</strong> ${vendorEmail}</p>
        <p><strong>Business Email:</strong> ${businessEmail}</p>
      </div>
      <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
      <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
      <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html: htmlContent,
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
  
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/92654e52-f522-4649-9f82-7b139ae6a1e5-new-alert-hmp.png';
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <img src="${imageUrl}" alt="HoldMyPlace Alert" style="width: 150px; height: auto; margin-bottom: 20px;">
      <h1 style="color: #4caf50;">Vendor Business Status Update</h1>
      <p>${message}</p>
      <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
      <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
      <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;


  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${mailOptions.to}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendBookingEmail({ email, subject, bookingDetails, message, highlightColor, imageUrl }) {
  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <img src="${imageUrl}" alt="HoldMyPlace Alert" style="width: 150px; height: auto; margin-bottom: 20px;">
        <h1 style="color: ${highlightColor};">${subject}</h1>
        <p style="margin-bottom: 20px;">Dear User,</p>
        <p style="margin-bottom: 20px;">${message}</p>
        <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h3 style="margin-bottom: 10px;">Booking Details:</h3>
            <p><strong>Booking ID:</strong> ${bookingDetails.booking_id}</p>
            <p><strong>Tickets:</strong> ${bookingDetails.booking_ticket_count}</p>
            <p><strong>Price:</strong> ${bookingDetails.booking_price}</p>
            <p><strong>Status:</strong> ${bookingDetails.booking_status}</p>
            <p><strong>Event:</strong> ${bookingDetails.event_name}</p>
            <p><strong>Date:</strong> ${bookingDetails.event_date}</p>
            <p><strong>Date:</strong> ${bookingDetails.event_time}</p>
        </div>
        <p style="margin-top: 20px;">If you have any questions, feel free to reach out to our support team.</p>
        <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
        <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Booking email sent to ${email}`);
  } catch (error) {
    logger.error(`Failed to send booking email to ${email}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendPinUpdateEmail(email, pin, userType) {
  const subject = `${userType} PIN Update Notification - HoldMyPlace`;
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/92654e52-f522-4649-9f82-7b139ae6a1e5-new-alert-hmp.png';

  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <img src="${imageUrl}" alt="HoldMyPlace Alert" style="width: 150px; height: auto; margin-bottom: 20px;">
        <h1 style="color: #4caf50;">Your PIN Has Been Updated</h1>
        <p style="margin-bottom: 20px;">Dear ${userType},</p>
        <p style="margin-bottom: 20px;">
            Your PIN has been successfully updated. Please find your new PIN below and ensure you keep it secure:
        </p>
        <div style="text-align: center; margin: 0 auto; max-width: 300px; padding: 15px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="margin: 0; color: #333;">${pin}</h2>
        </div>
        <p style="margin-top: 20px;">If you did not request this change, please contact our support team immediately.</p>
        <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
        <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`PIN update email sent to ${email}`);
  } catch (error) {
    logger.error(`Failed to send PIN update email to ${email}: ${error.message}`);
    throw new Error('Error sending email.');
  }
}

async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: process.env.GMAIL__USER,
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
  }
}

async function sendSupportRequestCreationEmail(support) {
  const subject = 'Thank You for Contacting HoldMyPlace Support';
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/f5c73ff3-336b-4bef-b9ac-8fe3c366de62-thnkuo.png';

  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <img src="${imageUrl}" alt="HoldMyPlace Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
        <h1 style="color: #4caf50;">Support Request Received</h1>
        <p style="margin-bottom: 20px; color: #555;">Dear ${support.support_name},</p>
        <p style="margin-bottom: 20px; color: #555;">
            Thank you for contacting HoldMyPlace Support. We have successfully received your request. Here are the details of your submission:
        </p>
        <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h3 style="margin-bottom: 10px; color: #4caf50;">Request Details:</h3>
            <p><strong>Name:</strong> ${support.support_name}</p>
            <p><strong>Email:</strong> ${support.support_email}</p>
            <p><strong>Phone:</strong> ${support.support_phone_number}</p>
            <p><strong>Type:</strong> ${support.support_type}</p>
            <p><strong>Subject:</strong> ${support.support_subject}</p>
            <p><strong>Message:</strong> ${support.support_message}</p>
        </div>
        <p style="margin-top: 20px; color: #555;">Our support team will get back to you shortly. Thank you for choosing HoldMyPlace.</p>
        <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
        <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: support.support_email,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Support request creation email sent to ${support.support_email}`);
  } catch (error) {
    console.error(`Failed to send support request creation email: ${error.message}`);
    throw error;
  }
}

async function sendSupportRequestUpdateEmail(support_email, support_status, support_remarks) {
  const subject = 'Status Update for Your Support Request - HoldMyPlace';
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/1e527155-e91b-4650-b2a4-acfd6a75ead2-logo-hmp.png';

  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <img src="${imageUrl}" alt="HoldMyPlace Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
        <h1 style="color: #4caf50;">Support Request Update</h1>
        <p style="margin-bottom: 20px; color: #555;">Dear User,</p>
        <p style="margin-bottom: 20px; color: #555;">
            Your support request status has been updated. Below are the latest details:
        </p>
        <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h3 style="margin-bottom: 10px; color: #4caf50;">Updated Status:</h3>
            <p><strong>Status:</strong> ${support_status}</p>
            <p><strong>Remarks:</strong> ${support_remarks || 'No additional remarks provided.'}</p>
        </div>
        <p style="margin-top: 20px; color: #555;">If you have further queries, please reach out to our support team. Thank you for trusting HoldMyPlace.</p>
        <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
        <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: support_email,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Support request update email sent to ${support_email}`);
  } catch (error) {
    console.error(`Failed to send support request update email: ${error.message}`);
    throw error;
  }
}

async function sendContactRequestCreationEmail(contact) {
  const subject = 'Thank You for Contacting HoldMyPlace';
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/f5c73ff3-336b-4bef-b9ac-8fe3c366de62-thnkuo.png';

  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <img src="${imageUrl}" alt="HoldMyPlace Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
        <h1 style="color: #4caf50;">Contact Request Received</h1>
        <p style="margin-bottom: 20px;">Dear ${contact.contact_name},</p>
        <p style="margin-bottom: 20px; color: #555;">
            Thank you for reaching out to HoldMyPlace. We have successfully received your contact request. Below are the details of your submission:
        </p>
        <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h3 style="margin-bottom: 10px; color: #4caf50;">Request Details:</h3>
            <p><strong>Name:</strong> ${contact.contact_name}</p>
            <p><strong>Phone:</strong> ${contact.contact_phone_number}</p>
            <p><strong>Email:</strong> ${contact.contact_email}</p>
            <p><strong>Subject:</strong> ${contact.contact_subject}</p>
            <p><strong>Message:</strong> ${contact.contact_message}</p>
        </div>
        <p style="margin-top: 20px; color: #555;">Our team will get back to you shortly. Thank you for choosing HoldMyPlace.</p>
        <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
        <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: contact.contact_email,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Contact request email sent to ${contact.contact_email}`);
  } catch (error) {
    console.error(`Failed to send contact request email: ${error.message}`);
    throw error;
  }
}

async function sendContactRequestUpdateEmail(contact_email, contact_status, contact_remarks) {
  const subject = 'Update on Your Contact Request - HoldMyPlace';
  const imageUrl = 'https://holdmyplaceimages.blob.core.windows.net/holdmyimage/1e527155-e91b-4650-b2a4-acfd6a75ead2-logo-hmp.png';

  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <img src="${imageUrl}" alt="HoldMyPlace Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
        <h1 style="color: #4caf50;">Contact Request Update</h1>
        <p style="margin-bottom: 20px;">Dear User,</p>
        <p style="margin-bottom: 20px; color: #555;">
            Your contact request status has been updated. Here are the latest details:
        </p>
        <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h3 style="margin-bottom: 10px; color: #4caf50;">Updated Status:</h3>
            <p><strong>Status:</strong> ${contact_status}</p>
            <p><strong>Remarks:</strong> ${contact_remarks || 'No additional remarks provided.'}</p>
        </div>
        <p style="margin-top: 20px; color: #555;">If you have further queries, feel free to contact our support team. Thank you for your interest in HoldMyPlace.</p>
        <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
        <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The HoldMyPlace Team</strong></p>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: contact_email,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Contact request update email sent to ${contact_email}`);
  } catch (error) {
    console.error(`Failed to send contact request update email: ${error.message}`);
    throw error;
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
  sendBookingEmail,
  sendPinUpdateEmail,
  sendEmail,
  sendContactRequestCreationEmail,
  sendContactRequestUpdateEmail,
  sendSupportRequestCreationEmail,
  sendSupportRequestUpdateEmail,
  sendOrganizerStatusEmail,
  sendOrganizerAdminAlertEmail
};
