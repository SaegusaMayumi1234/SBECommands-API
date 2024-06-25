import fs from 'fs';
import util from 'util';
import chalk from 'chalk';

interface logLevelType {
  error?: number;
  warn?: number;
  info?: number;
  game?: number;
  debug?: number;
  all?: number;
}

const logDir = './logs';
const monthToNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const startDate = {
  error: new Date(),
  warn: new Date(),
  info: new Date(),
  game: new Date(),
  debug: new Date(),
  all: new Date(),
};
const logFile: logLevelType = {
  error: undefined,
  warn: undefined,
  info: undefined,
  game: undefined,
  debug: undefined,
  all: undefined,
};
const levelColor = {
  error: `${chalk.redBright('error')}:`,
  warn: `${chalk.yellowBright('warn')}: `,
  info: `${chalk.white('info')}: `,
  game: `${chalk.greenBright('game')}: `,
  debug: `${chalk.cyanBright('debug')}:`,
};
const levelSpace = {
  error: 'error: ',
  warn: 'warn:  ',
  info: 'info:  ',
  game: 'game:  ',
  debug: 'debug: ',
};

function removeANSIFormatting(string: string) {
  return string.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    '',
  );
}

function getUTCObjectDate(date: Date, format: boolean) {
  const yearNum = date.getUTCFullYear();
  const monthNum = date.getUTCMonth() + 1;
  const dayNum = date.getUTCDate();
  const hourNum = date.getUTCHours();
  const minuteNum = date.getUTCMinutes();
  const secondNum = date.getUTCSeconds();
  const millisecondNum = date.getUTCMilliseconds();

  const year = `${yearNum}`;
  let month = `${monthNum}`;
  let day = `${dayNum}`;
  let hour = `${hourNum}`;
  let minute = `${minuteNum}`;
  let second = `${secondNum}`;
  let millisecond = `${millisecondNum}`;

  if (format === true) {
    if (monthNum < 10) {
      month = `0${month}`;
    }
    if (dayNum < 10) {
      day = `0${day}`;
    }
    if (hourNum < 10) {
      hour = `0${hour}`;
    }
    if (minuteNum < 10) {
      minute = `0${minute}`;
    }
    if (secondNum < 10) {
      second = `0${second}`;
    }
    if (millisecondNum < 10) {
      millisecond = `0${millisecond}`;
    }
    if (millisecondNum < 100) {
      millisecond = `0${millisecond}`;
    }
  }
  return { year, month, day, hour, minute, second, millisecond };
}

function selectLogFile(date: Date, level: keyof typeof logFile) {
  const { year, month, day } = getUTCObjectDate(date, true);
  const monthName = monthToNames[date.getUTCMonth()];
  const yearPath = util.format('%s/%s', logDir, year);
  const monthPath = util.format('%s/%s/%s', logDir, year, monthName);
  const dayPath = util.format('%s/%s/%s/%s', logDir, year, monthName, day);

  if (!fs.existsSync(logDir)) {
    try {
      fs.mkdirSync(util.format(logDir));
    } catch (error: unknown) {
      if (error) console.log(error);
    }
  }
  if (!fs.existsSync(yearPath)) {
    try {
      fs.mkdirSync(util.format(yearPath));
    } catch (error: unknown) {
      if (error) console.log(error);
    }
  }
  if (!fs.existsSync(monthPath)) {
    try {
      fs.mkdirSync(util.format(monthPath));
    } catch (error: unknown) {
      if (error) console.log(error);
    }
  }
  if (!fs.existsSync(dayPath)) {
    try {
      fs.mkdirSync(util.format(dayPath));
    } catch (error: unknown) {
      if (error) console.log(error);
    }
  }

  const path = util.format('%s/%s/%s/%s/%s-%s-%s-%s.log', logDir, year, monthName, day, year, month, day, level);
  logFile[level] = fs.openSync(path, 'as');
}

function saveCombined(hour: string, minute: string, second: string, millisecond: string, dataLevel: keyof typeof logFile, data: Array<unknown>) {
  const level = 'all';
  if (logFile[level] === undefined) selectLogFile(startDate[level], level);
  const currentDate = new Date();

  if (currentDate.getUTCDate() !== startDate[level].getUTCDate()) {
    startDate[level] = currentDate;
    fs.closeSync(logFile[level]!);
    selectLogFile(startDate[level], level);
  }
  // WRITE FILE
  const result = fs.writeSync(
    logFile[level]!,
    removeANSIFormatting(
      util.format(
        `%s:%s:%s.%s GMT > %s%s${' %s'.repeat(data.length - 1)}\n`,
        hour,
        minute,
        second,
        millisecond,
        levelSpace[dataLevel as keyof typeof levelSpace],
        util.inspect(data, { showHidden: false, depth: null, colors: false }),
      ),
    ),
  );
  if (!result || result < 1) {
    console.log(util.format('%s:%s:%s.%s GMT > %s -', hour, minute, second, millisecond, `Error trying to write in ${logFile[level]}`));
  }
}

function log(data: Array<unknown>, level: keyof typeof logFile) {
  if (logFile[level] === undefined) selectLogFile(startDate[level], level);
  const currentDate = new Date();

  if (currentDate.getUTCDate() !== startDate[level].getUTCDate()) {
    startDate[level] = currentDate;
    fs.closeSync(logFile[level]!);
    selectLogFile(startDate[level], level);
  }
  const { hour, minute, second, millisecond } = getUTCObjectDate(currentDate, true);
  // WRITE FILE
  const result = fs.writeSync(
    logFile[level]!,
    removeANSIFormatting(
      util.format(
        `%s:%s:%s.%s GMT > %s%s${' %s'.repeat(data.length - 1)}\n`,
        hour,
        minute,
        second,
        millisecond,
        levelSpace[level as keyof typeof levelSpace],
        util.inspect(data, { showHidden: false, depth: null, colors: false }),
      ),
    ),
  );
  if (!result || result < 1) {
    console.log(util.format('%s:%s:%s.%s GMT > %s -', hour, minute, second, millisecond, `Error trying to write in ${logFile[level]}`));
  }
  // WRITE LOG
  console.log(util.format('%s:%s:%s.%s GMT > %s', hour, minute, second, millisecond, levelColor[level as keyof typeof levelColor]), ...data);
  saveCombined(
    hour,
    minute,
    second,
    millisecond,
    level,
    data,
  );
}

export function error(...data: Array<unknown>) {
  log(data, 'error');
}

export function warn(...data: Array<unknown>) {
  log(data, 'warn');
}

export function info(...data: Array<unknown>) {
  log(data, 'info');
}

export function game(...data: Array<unknown>) {
  log(data, 'game');
}

export function debug(...data: Array<unknown>) {
  log(data, 'debug');
}
