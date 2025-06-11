import { ArgumentsHost, ExceptionFilter, Logger, HttpException } from "@nestjs/common";
import { Response } from 'express';
import * as fs from 'fs';

export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    try {
      fs.appendFileSync('errors.log', `[${new Date().toISOString()}] ${status} - ${exception.message}\n`);
    } catch (err) {
      Logger.error('Ошибка записи в errors.log', err);
    }

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
    });
  }
}
