import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule';
import { CoinModule } from './coin/coin.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'Lith19890118',
      host: '127.0.0.1',
      port: 3306,
      database: 'spider',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    CoinModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
