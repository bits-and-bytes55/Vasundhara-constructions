const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const dbStateMap = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    database: dbStateMap[mongoose.connection.readyState] || 'unknown',
  });
});

module.exports = router;
