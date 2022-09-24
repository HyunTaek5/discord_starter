import moment from 'moment';
import * as winston from 'winston';
import { LogLevel } from './enum';

export class Logger {
  private logDir: string;
  private logFormat: winston.Logform.Format;
  private logger: winston.Logger;

  constructor() {
    this.logDir = 'logs';
    this.logFormat = winston.format.printf((info) => {
      return `${info.level}: ${info.message}`;
    });
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        this.logFormat,
        winston.format.simple(),
        winston.format.colorize(),
      ),
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: `${moment().format('YYYY-MM-DD')}.error.log`,
          dirname: `${this.logDir}/error`,
          maxsize: 5000000,
        }),
        new winston.transports.File({
          level: 'info',
          filename: `${moment().format('YYYY-MM-DD')}.log`,
          dirname: `${this.logDir}/info`,
          maxsize: 5000000,
        }),
      ],
    });
  }

  log(message: any, context?: string) {
    const logMessage = this.isProduction()
      ? this.convertToJSONMessage(message, LogLevel.INFO, context)
      : this.convertToPlainMessage(message, LogLevel.INFO, context);

    this.logger.info(logMessage);
  }

  warn(message: any, context?: string) {
    const warnMessage = this.isProduction()
      ? this.convertToJSONMessage(message, LogLevel.ERROR, context)
      : this.convertToPlainMessage(message, LogLevel.ERROR, context);

    this.logger.warn(warnMessage);
  }

  error(message: any, context?: string) {
    if (message instanceof Error) {
      const err = message;
      const errorMessage = this.isProduction()
        ? this.convertToJSONMessage(err.message, LogLevel.ERROR, context)
        : this.convertToPlainMessage(err.message, LogLevel.ERROR, context);

      this.logger.error(errorMessage);
    } else {
      const errorMessage = this.isProduction()
        ? this.convertToJSONMessage(message, LogLevel.ERROR, context)
        : this.convertToPlainMessage(message, LogLevel.ERROR, context);

      this.logger.error(errorMessage);
    }
  }

  private isProduction() {
    return process.env.ENV === 'production';
  }

  private convertToJSONMessage(
    message: any,
    level: LogLevel,
    context?: string,
  ) {
    const now = new Date();
    const stringifiedMessage =
      typeof message === 'string' ? message : JSON.stringify(message);

    const jsonMessage = JSON.stringify({
      level,
      timestamp: +now,
      datetime: now.toISOString(),
      message: stringifiedMessage,
      context,
    });

    return jsonMessage;
  }

  private convertToPlainMessage(
    message: any,
    level: LogLevel,
    context?: string,
  ) {
    const now = new Date();
    const stringifiedMessage =
      typeof message === 'string' ? message : JSON.stringify(message);

    const plainMessage = [
      `[${level}]`,
      `[${now.toISOString()}]`,
      context ? `[${context}]` : null,
      stringifiedMessage,
    ]
      .filter(Boolean)
      .join(' ');

    return plainMessage;
  }
}
