import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinGateway } from './coin.gateway';
import { CoinController } from './coin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from './entities/coin.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coin]),
    //定时任务
    ScheduleModule.forRoot()
  ],
  providers: [CoinGateway, CoinService],
  controllers: [CoinController],
})
export class CoinModule { }
