import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  //使用fastify平台
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  //处理异常返回数据格式
  app.useGlobalFilters(new HttpExceptionFilter())
  //处理正常返回数据格式
  app.useGlobalInterceptors(new TransformInterceptor())
  //监听3000端口
  await app.listen(3000);
}
bootstrap();
