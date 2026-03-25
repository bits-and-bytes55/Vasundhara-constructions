const path = require('path');
const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const apiRoutes = require('./routes');

const app = express();
const uploadsDirectory = path.join(__dirname, 'data', 'uploads');

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', express.static(uploadsDirectory));
app.use('/api', apiRoutes);

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
