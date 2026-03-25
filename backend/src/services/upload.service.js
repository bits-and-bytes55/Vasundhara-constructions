const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');

const uploadsDirectory = path.join(__dirname, '..', 'data', 'uploads');

const supportedMimeTypes = {
  'image/gif': '.gif',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/svg+xml': '.svg',
  'image/webp': '.webp',
};

function createHttpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function sanitizeFileBaseName(fileName) {
  return path
    .basename(fileName, path.extname(fileName))
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || 'project-image';
}

function parseImageDataUrl(dataUrl) {
  if (typeof dataUrl !== 'string') {
    throw createHttpError('Image upload payload is invalid.', 400);
  }

  const match = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(dataUrl);

  if (!match) {
    throw createHttpError('Only base64 image uploads are supported.', 400);
  }

  const mimeType = match[1].toLowerCase();
  const base64 = match[2];
  const extension = supportedMimeTypes[mimeType];

  if (!extension) {
    throw createHttpError('Unsupported image format.', 400);
  }

  return {
    buffer: Buffer.from(base64, 'base64'),
    extension,
  };
}

async function saveProjectImage({ dataUrl, fileName }) {
  if (typeof fileName !== 'string' || !fileName.trim()) {
    throw createHttpError('File name is required for image upload.', 400);
  }

  const { buffer, extension } = parseImageDataUrl(dataUrl);

  if (buffer.length === 0) {
    throw createHttpError('Uploaded image is empty.', 400);
  }

  if (buffer.length > 8 * 1024 * 1024) {
    throw createHttpError('Image size must be 8MB or smaller.', 400);
  }

  await fs.mkdir(uploadsDirectory, { recursive: true });

  const storedFileName = `${sanitizeFileBaseName(fileName)}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}${extension}`;
  const absolutePath = path.join(uploadsDirectory, storedFileName);

  await fs.writeFile(absolutePath, buffer);

  return {
    fileName: storedFileName,
    url: `/api/uploads/${storedFileName}`,
  };
}

module.exports = {
  saveProjectImage,
};
