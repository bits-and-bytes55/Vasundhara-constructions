const env = require('../config/env');
const { verifyToken } = require('../utils/token');

function requireAdminAuth(req, _res, next) {
  const authorizationHeader = req.get('authorization');

  if (!authorizationHeader?.startsWith('Bearer ')) {
    const error = new Error('Authentication required.');
    error.status = 401;
    return next(error);
  }

  const token = authorizationHeader.slice('Bearer '.length).trim();

  try {
    req.user = verifyToken(token, env.authTokenSecret);
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  requireAdminAuth,
};
