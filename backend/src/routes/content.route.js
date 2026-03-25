const express = require('express');
const { requireAdminAuth } = require('../middleware/auth.middleware');
const { readHomeContent, writeHomeContent } = require('../services/content.service');

const router = express.Router();

router.get('/home', async (_req, res, next) => {
  try {
    const content = await readHomeContent();
    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/home', requireAdminAuth, async (req, res, next) => {
  try {
    const content = await writeHomeContent(req.body);
    res.status(200).json({
      success: true,
      message: 'Home content updated successfully.',
      data: content,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
