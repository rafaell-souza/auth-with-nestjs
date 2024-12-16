import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: any, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : 500;

        let msg = "Internal Server Error";
        if (exception instanceof HttpException) {
            const response = exception.getResponse();

            if (typeof response === 'object' && response['message']) {
                msg = response['message'];
            } else if (typeof response === 'string') {
                msg = response;
            } else {
                msg = "Internal Server Error";
            }
        }

        const responseBody = {
            statusCode: status,
            message: msg,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, status);
    }
}
