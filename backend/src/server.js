const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const env = require('./config/env');
const { connectToDatabase } = require('./config/db');

const server = http.createServer(app);

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down...`);
  server.close(async () => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error during MongoDB disconnect:', error.message);
    } finally {
      process.exit(0);
    }
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

connectToDatabase(env.mongoUri).finally(() => {
  server.listen(env.port, () => {
    console.log(`Backend server listening on port ${env.port}`);
  });
});
