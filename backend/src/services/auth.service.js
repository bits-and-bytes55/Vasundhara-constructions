const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');

const usersPath = path.join(__dirname, '..', 'data', 'admin-users.json');

const normalizeEmail = (email) => email.trim().toLowerCase();

async function readUsersStore() {
  const rawContent = await fs.readFile(usersPath, 'utf-8');
  const parsedContent = JSON.parse(rawContent);

  if (!parsedContent || typeof parsedContent !== 'object' || !Array.isArray(parsedContent.users)) {
    throw new Error('Stored admin users data is invalid.');
  }

  return parsedContent;
}

async function writeUsersStore(nextStore) {
  await fs.writeFile(usersPath, `${JSON.stringify(nextStore, null, 2)}\n`, 'utf-8');
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

async function registerAdminUser({ name, email, password }) {
  const cleanName = name?.trim();
  const cleanEmail = email?.trim();
  const cleanPassword = password?.trim();

  if (!cleanName || !cleanEmail || !cleanPassword) {
    const error = new Error('Name, email, and password are required.');
    error.status = 400;
    throw error;
  }

  if (cleanPassword.length < 6) {
    const error = new Error('Password must be at least 6 characters long.');
    error.status = 400;
    throw error;
  }

  const store = await readUsersStore();
  const normalizedEmail = normalizeEmail(cleanEmail);

  if (store.users.some((user) => user.email === normalizedEmail)) {
    const error = new Error('An admin account with this email already exists.');
    error.status = 409;
    throw error;
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const nextUser = {
    id: crypto.randomUUID(),
    name: cleanName,
    email: normalizedEmail,
    passwordHash: hashPassword(cleanPassword, salt),
    salt,
    createdAt: new Date().toISOString(),
  };

  store.users.push(nextUser);
  await writeUsersStore(store);

  return sanitizeUser(nextUser);
}

async function loginAdminUser({ email, password }) {
  const cleanEmail = email?.trim();
  const cleanPassword = password?.trim();

  if (!cleanEmail || !cleanPassword) {
    const error = new Error('Email and password are required.');
    error.status = 400;
    throw error;
  }

  const store = await readUsersStore();
  const normalizedEmail = normalizeEmail(cleanEmail);
  const existingUser = store.users.find((user) => user.email === normalizedEmail);

  if (!existingUser) {
    const error = new Error('Invalid email or password.');
    error.status = 401;
    throw error;
  }

  const expectedHash = hashPassword(cleanPassword, existingUser.salt);
  const actualBuffer = Buffer.from(existingUser.passwordHash, 'hex');
  const expectedBuffer = Buffer.from(expectedHash, 'hex');

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    const error = new Error('Invalid email or password.');
    error.status = 401;
    throw error;
  }

  return sanitizeUser(existingUser);
}

async function getAdminUserById(id) {
  const store = await readUsersStore();
  const existingUser = store.users.find((user) => user.id === id);
  return existingUser ? sanitizeUser(existingUser) : null;
}

module.exports = {
  getAdminUserById,
  loginAdminUser,
  registerAdminUser,
};
