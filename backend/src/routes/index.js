const express = require('express');
const authRoute = require('./auth.route');
const healthRoute = require('./health.route');
const contentRoute = require('./content.route');
const uploadRoute = require('./upload.route');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend API is running',
  });
});

router.use('/health', healthRoute);
router.use('/auth', authRoute);
router.use('/content', contentRoute);
router.use('/media', uploadRoute);

module.exports = router;
