import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // Your email address used for sending
    pass: process.env.EMAIL_PASS, // App password for your email
  },
});

// Backend route to send email
export const sendEmail = async (req, res) => {
    const { senderName, senderEmail, subject, message } = req.body;
  
    if (!senderName || !senderEmail || !subject || !message) {
      console.error("Missing fields in request body");
      return res.status(400).json({ error: "All fields are required!" });
    }
  
    try {
      console.log("Preparing to send email...");
      await transporter.sendMail({
        from: `${senderName} <${senderEmail}>`, // Dynamic sender
        to: process.env.RECEIVER_EMAIL, // Static receiver
        subject: `Contact Form: ${subject}`, // Subject
        html: `
          <h3>New Message From Your Portfolio</h3>
          <p><strong>Name:</strong> ${senderName}</p>
          <p><strong>Email:</strong> ${senderEmail}</p>
          <p><strong>Message:</strong><br>${message}</p>
        `,
      });
      console.log("EMAIL_USER:", process.env.EMAIL_USER);
      console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");

      console.log("Email sent successfully");
      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error); // Log error details
      return res.status(500).json({ error: "Failed to send email" });
    }
  };
  
