const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
};

const log = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  switch (level) {
    case LOG_LEVELS.ERROR:
      console.error(logMessage, data);
      break;
    case LOG_LEVELS.WARN:
      console.warn(logMessage, data);
      break;
    case LOG_LEVELS.DEBUG:
      console.debug(logMessage, data);
      break;
    default:
      console.log(logMessage, data);
  }
};

export const logger = {
  info: (message, data) => log(LOG_LEVELS.INFO, message, data),
  warn: (message, data) => log(LOG_LEVELS.WARN, message, data),
  error: (message, data) => log(LOG_LEVELS.ERROR, message, data),
  debug: (message, data) => log(LOG_LEVELS.DEBUG, message, data)
}; 