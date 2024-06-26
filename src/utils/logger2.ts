import winston from 'winston';
import ansiRegex from 'ansi-regex';
import { SPLAT } from 'triple-beam';
import util from 'util';
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
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan',
};
const longestStr = Math.max(...Object.keys(levels).map((key) => key.length));

winston.addColors(colors);

function getFormat(colorize?: boolean) {
  const format = [winston.format.errors({ stack: true }), winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' })];
  if (colorize) {
    format.push(winston.format.colorize());
  }
  format.push(
    winston.format.printf((info) => {
      console.log(info.level, info.message);
      return `${info.timestamp} ${info.level}:${' '.repeat(longestStr - info.level.replace(ansiRegex(), '').length)} ${info.stack ? info.stack : info.message.test.map((value: any) => value.stack).join(' ')}`;
    }),
  );
  return winston.format.combine(...format);
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

const transports = [new winston.transports.Console({ format: getFormat(true) }), transportError, transportAll];

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'http',
  levels,
  format: getFormat(false),
  transports,
});

// export default logger;
function formatLog(data: Array<any>) {
  return data.map((value) => (value instanceof Error ? value.stack : value)).join(' ');
}

export default {
  error: (...data: Array<unknown>) => {
    logger.error({
      test: data,
    });
  },
  warn: (...data: Array<unknown>) => {
    logger.warn(formatLog(data));
  },
  info: (...data: Array<unknown>) => {
    logger.info({
      test: data,
    });
  },
  http: (...data: Array<unknown>) => {
    logger.http(formatLog(data));
  },
  debug: (...data: Array<unknown>) => {
    logger.debug(formatLog(data));
  },
};
