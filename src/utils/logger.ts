import winston from 'winston';
import ansiRegex from 'ansi-regex';
import chalk from 'chalk';
import { SPLAT } from 'triple-beam';
import fs from 'fs';
import 'winston-daily-rotate-file';

const monthToNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const longestStr = Math.max(...Object.keys(levels).map((key) => key.length));

function colorizeLevel(level: string) {
  let res = level;
  switch (level) {
    case 'error':
      res = chalk.red(level);
      break;
    case 'warn':
      res = chalk.yellow(level);
      break;
    case 'info':
      res = chalk.green(level);
      break;
    case 'http':
      res = chalk.magenta(level);
      break;
    case 'debug':
      res = chalk.cyan(level);
      break;
    default:
      break;
  }
  return res;
}

function getFormat() {
  return winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.printf((info) => {
      const splat = info[SPLAT] || [];
      const alignSpace = ' '.repeat(longestStr - info.level.replace(ansiRegex(), '').length);
      if (info.level === 'error') {
        console.error(info.timestamp, `${colorizeLevel(info.level)}:${alignSpace}`, ...splat);
      } else {
        console.log(info.timestamp, `${colorizeLevel(info.level)}:${alignSpace}`, ...splat);
      }
      return `${info.timestamp} ${info.level}:${alignSpace} ${info.message}`;
    }),
  );
}

function getDirName() {
  const currDate = new Date();
  return `${currDate.getUTCFullYear()}/${('0' + (currDate.getUTCMonth() + 1)).slice(-2)}-${monthToNames[currDate.getUTCMonth()]}`;
}

function createNewDailyRotateFile(type: string, level?: string) {
  return new winston.transports.DailyRotateFile({
    dirname: `logs/${getDirName()}`,
    filename: `%DATE%-log-${type}`,
    datePattern: 'YYYY-MM-DD',
    level: level,
    extension: '.log',
    utc: true,
  });
}

let transportAll = createNewDailyRotateFile('all', 'debug');

let transportError = createNewDailyRotateFile('error', 'error');

transportAll.on('rotate', () => {
  if (!fs.existsSync(`logs/${getDirName()}/`)) {
    transportAll = createNewDailyRotateFile('all', 'debug');
  }
});

transportError.on('rotate', () => {
  if (!fs.existsSync(`logs/${getDirName()}/`)) {
    transportError = createNewDailyRotateFile('error', 'error');
  }
});

const transports = [transportError, transportAll];

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'http',
  levels,
  format: getFormat(),
  transports,
});

function formatLog(data: Array<any>) {
  return data.map((value) => (value instanceof Error ? value.stack : value)).join(' ');
}

export default {
  error: (...data: Array<unknown>) => {
    logger.error(formatLog(data), ...data);
  },
  warn: (...data: Array<unknown>) => {
    logger.warn(formatLog(data), ...data);
  },
  info: (...data: Array<unknown>) => {
    logger.info(formatLog(data), ...data);
  },
  http: (...data: Array<unknown>) => {
    logger.http(formatLog(data), ...data);
  },
  debug: (...data: Array<unknown>) => {
    logger.debug(formatLog(data), ...data);
  },
};
