import { Controller, Get, Res, Req, Inject } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('coin')
export class CoinController {

    constructor(
        private readonly coinService: CoinService
    ) { }


    @Get("save")
    saveData() {
        return this.coinService.crawlCoinMarketCap();
    }

    @Get("list")
    list() {
        return this.coinService.findAll();
    }

    @Get("redis")
    redisSet() {
        return this.coinService.setRedis()
    }

}
