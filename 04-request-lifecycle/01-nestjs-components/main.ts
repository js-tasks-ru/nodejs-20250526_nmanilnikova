import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from "./app.module";
import { HttpErrorFilter } from "filters/http-error.filter";
import { ApiVersionInterceptor } from "./interceptors/api-version.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalInterceptors(new ApiVersionInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
