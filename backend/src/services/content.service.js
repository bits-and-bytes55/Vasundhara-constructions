const fs = require('fs/promises');
const path = require('path');

const homeContentPath = path.join(__dirname, '..', 'data', 'home-content.json');

async function readHomeContent() {
  const rawContent = await fs.readFile(homeContentPath, 'utf-8');
  const parsedContent = JSON.parse(rawContent);

  if (!parsedContent || typeof parsedContent !== 'object' || Array.isArray(parsedContent)) {
    throw new Error('Stored home content is invalid.');
  }

  return parsedContent;
}

async function writeHomeContent(nextContent) {
  if (!nextContent || typeof nextContent !== 'object' || Array.isArray(nextContent)) {
    const error = new Error('Home content payload must be an object.');
    error.status = 400;
    throw error;
  }

  await fs.writeFile(homeContentPath, `${JSON.stringify(nextContent, null, 2)}\n`, 'utf-8');
  return nextContent;
}

module.exports = {
  readHomeContent,
  writeHomeContent,
};
