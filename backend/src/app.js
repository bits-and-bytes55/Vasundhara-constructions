const path = require('path');
const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const apiRoutes = require('./routes');
const nodemailer = require('nodemailer');

const app = express();
const uploadsDirectory = path.join(__dirname, 'data', 'uploads');

const allowedOrigins = [
  'http://localhost:5173',
  'https://ashushafi.onrender.com'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', express.static(uploadsDirectory));
app.use('/api', apiRoutes);
// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { fullName, phone, email, city, service, projectScale, message } = req.body;

  // Basic validation
  if (!fullName || !phone || !email) {
    return res.status(400).json({ error: 'Name, phone and email are required.' });
  }

  try {
    // Email content
    const mailOptions = {
      from: `"Vasundhara Website" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Request from ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>City:</strong> ${city || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
        <p><strong>Project Scale:</strong> ${projectScale || 'Not specified'}</p>
        <p><strong>Message:</strong><br/>${message || 'No message'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});


app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;
