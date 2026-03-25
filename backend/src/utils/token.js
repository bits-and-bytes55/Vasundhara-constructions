const crypto = require('crypto');

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function signPayload(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function createToken(user, secret) {
  const payload = Buffer.from(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      exp: Date.now() + TOKEN_TTL_MS,
    }),
  ).toString('base64url');

  const signature = signPayload(payload, secret);
  return `${payload}.${signature}`;
}

function verifyToken(token, secret) {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    const error = new Error('Invalid token format.');
    error.status = 401;
    throw error;
  }

  const [payload, signature] = token.split('.');
  const expectedSignature = signPayload(payload, secret);

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    const error = new Error('Invalid token signature.');
    error.status = 401;
    throw error;
  }

  const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));

  if (!decodedPayload.exp || decodedPayload.exp < Date.now()) {
    const error = new Error('Token has expired.');
    error.status = 401;
    throw error;
  }

  return decodedPayload;
}

module.exports = {
  createToken,
  verifyToken,
};
