const express = require('express');
const { requireAdminAuth } = require('../middleware/auth.middleware');
const { getAdminUserById, loginAdminUser, registerAdminUser } = require('../services/auth.service');
const env = require('../config/env');
const { createToken } = require('../utils/token');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const user = await registerAdminUser(req.body);
    const token = createToken(user, env.authTokenSecret);

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully.',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await loginAdminUser(req.body);
    const token = createToken(user, env.authTokenSecret);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/me', requireAdminAuth, async (req, res, next) => {
  try {
    const user = await getAdminUserById(req.user.sub);

    if (!user) {
      const error = new Error('Admin account not found.');
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
