// utils/logger.js
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,           // colorful output
      translateTime: 'SYS:standard', // human-readable timestamp
      ignore: 'pid,hostname'    // hide PID/host info
    },
  },
});

module.exports = logger;
