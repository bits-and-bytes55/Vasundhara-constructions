const express = require('express');
const { requireAdminAuth } = require('../middleware/auth.middleware');
const { saveProjectImage } = require('../services/upload.service');

const router = express.Router();

router.post('/project-image', requireAdminAuth, async (req, res, next) => {
  try {
    const upload = await saveProjectImage(req.body);

    res.status(201).json({
      success: true,
      message: 'Project image uploaded successfully.',
      data: upload,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
